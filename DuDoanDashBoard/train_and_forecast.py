import pandas as pd
import numpy as np
import warnings
from datetime import datetime
from db_config import get_db_connection

# Thư viện AI: Gọi cả 2 thuật toán
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

warnings.filterwarnings("ignore")

def run_ml_pipeline():
    print("🚀 Bắt đầu tiến trình AI Dự báo & Đánh giá (AutoML)...")
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # 1. LÀM SẠCH DỮ LIỆU CŨ
        cursor.execute("DELETE FROM demand_forecasts")
        conn.commit()
        print("✅ Đã làm sạch bảng demand_forecasts cũ.")

        # 2. TRÍCH XUẤT DỮ LIỆU THỰC TẾ
        query = """
            SELECT 
                tour_id, 
                DATE_FORMAT(booking_date, '%Y-%m-01') AS month, 
                SUM(num_people) AS total_passengers
            FROM bookings 
            WHERE status = 'CONFIRMED'
            GROUP BY tour_id, month 
            ORDER BY tour_id, month ASC
        """
        df = pd.read_sql(query, conn)

        if df.empty:
            print("⚠️ Không có dữ liệu trong bảng bookings để dự báo!")
            return

        df['month'] = pd.to_datetime(df['month'])
        tour_ids = df['tour_id'].unique()

        # 3. HUẤN LUYỆN, SO SÁNH VÀ DỰ BÁO
        for tour_id in tour_ids:
            tour_data = df[df['tour_id'] == tour_id].copy()
            tour_data = tour_data.sort_values('month')

            if len(tour_data) < 2:
                print(f"⚠️ Tour ID {tour_id} chưa đủ dữ liệu (cần tối thiểu 2 tháng). Bỏ qua.")
                continue

            # Số hóa thời gian
            tour_data['time_index'] = np.arange(len(tour_data))
            X = tour_data[['time_index']]
            y = tour_data['total_passengers']

            # ==========================================================
            #  LINEAR REGRESSION vs RANDOM FOREST
            # ==========================================================
            
            #  Hồi quy tuyến tính
            model_lr = LinearRegression()
            model_lr.fit(X, y)
            pred_lr = model_lr.predict(X)
            r2_lr = max(0.0, float(r2_score(y, pred_lr)))
            mae_lr = float(mean_absolute_error(y, pred_lr))

            #  Rừng ngẫu nhiên
            model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
            model_rf.fit(X, y)
            pred_rf = model_rf.predict(X)
            r2_rf = max(0.0, float(r2_score(y, pred_rf)))
            mae_rf = float(mean_absolute_error(y, pred_rf))

            # In báo cáo so sánh ra Terminal
            print(f"\n--- KẾT QUẢ TOUR ID: {tour_id} ---")
            print(f"[-] Linear Regression: R2 = {r2_lr*100:>5.1f}% | MAE = {mae_lr:.1f}")
            print(f"[-] Random Forest    : R2 = {r2_rf*100:>5.1f}% | MAE = {mae_rf:.1f}")

            # AI Tự động chọn mô hình chiến thắng
            if r2_rf > r2_lr:
                best_model = model_rf
                mae_value = mae_rf
                r2_value = r2_rf
                best_name = "Random Forest"
            else:
                best_model = model_lr
                mae_value = mae_lr
                r2_value = r2_lr
                best_name = "Linear Regression"

            print(f"🏆 HỆ THỐNG CHỌN: {best_name}")
            
            # ==========================================================
            # KẾT THÚC SO SÁNH - BẮT ĐẦU LƯU DỮ LIỆU

            clean_tour_id = int(tour_id) 
            insert_query = """
                INSERT INTO demand_forecasts (tour_id, forecast_month, actual_passengers, predicted_passengers, mae, r2_score)
                VALUES (%s, %s, %s, %s, %s, %s)
            """

            # Lưu dữ liệu THỰC TẾ (Sử dụng Best Model)
            for index, row in tour_data.iterrows():
                predicted_past = int(best_model.predict([[row['time_index']]])[0])
                predicted_past = max(0, predicted_past) 
                
                cursor.execute(insert_query, (
                    clean_tour_id, 
                    row['month'].strftime('%Y-%m-%d'), 
                    int(row['total_passengers']), 
                    predicted_past,
                    mae_value,
                    r2_value
                ))

            # Dự báo 3 THÁNG TIẾP THEO (Sử dụng Best Model)
            last_month = tour_data['month'].iloc[-1]
            last_index = tour_data['time_index'].iloc[-1]

            for i in range(1, 4):
                future_month = last_month + pd.DateOffset(months=i)
                future_index = last_index + i
                
                predicted_future = int(best_model.predict([[future_index]])[0])
                predicted_future = max(0, predicted_future)

                cursor.execute(insert_query, (
                    clean_tour_id, 
                    future_month.strftime('%Y-%m-%d'), 
                    None, 
                    predicted_future,
                    mae_value,
                    r2_value
                ))

        # 4. HOÀN TẤT
        conn.commit()
        print("\n🎉 Cập nhật AI thành công! Hãy F5 lại React Dashboard.")

    except Exception as e:
        print(f"❌ Lỗi: {e}")
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    run_ml_pipeline()