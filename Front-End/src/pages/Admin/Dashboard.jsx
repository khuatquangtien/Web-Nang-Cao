import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css"; // Dùng chung CSS với Admin
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const Dashboard = () => {
  const navigate = useNavigate();

  // State quản lý Tour được chọn và Dữ liệu biểu đồ
  const [selectedTourId, setSelectedTourId] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tourList, setTourList] = useState([]);
  const currentTourInfo = chartData;
  const [isCalculating, setIsCalculating] = useState(false);
  useEffect(() => {
    fetch("http://localhost:9090/tours")
      .then((res) => res.json())
      .then((data) => {
        setTourList(data);
        console.log("Danh sách Tour:", data);
        // Tự động chọn Tour đầu tiên trong danh sách làm mặc định
        if (data && data.length > 0) {
          setSelectedTourId(data[0].id.toString());
        }
      })
      .catch((err) => console.error("Lỗi tải danh sách Tour:", err));
  }, []); // Mảng rỗng [] nghĩa là chỉ chạy 1 lần khi load trang

  // Gọi API mỗi khi selectedTourId thay đổi
  useEffect(() => {
    fetchForecastData(selectedTourId);
  }, [selectedTourId]);

  const fetchForecastData = async (tourId) => {
    setLoading(true);
    setError(null);
    try {
      // Sử dụng đúng port 9090 như trong ảnh code Spring Boot của bạn
      const response = await fetch(
        `http://localhost:9090/api/admin/forecast/${tourId}`,
      );
      if (!response.ok) {
        throw new Error(
          "Không thể tải dữ liệu dự báo hoặc chưa có dữ liệu cho Tour này.",
        );
      }
      const data = await response.json();
      setChartData(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  // Cấu hình dữ liệu cho Line Chart
  const lineChartData = {
    labels: chartData?.labels || [],
    datasets: [
      {
        label: "Khách Thực Tế",
        data: chartData?.actualData || [],
        borderColor: "#2ecc71", // Xanh lá
        backgroundColor: "rgba(46, 204, 113, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "AI Dự Báo",
        data: chartData?.predictedData || [],
        borderColor: "#f39c12", // Cam
        backgroundColor: "transparent",
        borderDash: [5, 5], // Đường đứt nét
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Số lượng hành khách" },
      },
    },
  };
  const handleRunAIPipeline = () => {
    setIsCalculating(true); // Hiển thị trạng thái đang tính toán

    // Gọi API sang Spring Boot (Đổi cổng 9090 nếu backend của bạn dùng cổng khác)
    fetch("http://localhost:9090/api/ai/run-pipeline", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("❌ Chạy AI thất bại: " + data.error);
        } else {
          alert("✅ Hoàn tất! Dữ liệu dự báo đã được cập nhật.");
          window.location.reload(); // Tự động load lại trang để vẽ lại biểu đồ mới nhất
        }
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        alert("❌ Mất kết nối đến Server Spring Boot!");
      })
      .finally(() => {
        setIsCalculating(false); // Tắt trạng thái load
      });
  };

  return (
    <div
      className="admin-container"
      style={{ display: "flex", minHeight: "100vh" }}
    >
      {/* --- SIDEBAR (Giữ nguyên cấu trúc của bạn) --- */}
      <div className="sidebar">
        <div className="sidebar-header">HỆ THỐNG QUẢN LÝ</div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/dashboard")} className="active">
            <i className="bi bi-speedometer2"></i> Dashboard
          </li>
          <li  onClick={() => navigate("/admin")}>
            <i className="bi bi-cart-fill"></i> Quản lý Đặt Tour
          </li>
          <li className="">
            <i className="bi bi-people-fill"></i> Khách hàng
          </li>
          <li className="" onClick={() => navigate("/tourManager")}>
            <i className="bi bi-map-fill"></i> Tour du lịch
          </li>
          <li className="" onClick={() => navigate("/home")}>
            <i className="bi bi-box-arrow-left"></i> Về trang chủ
          </li>
        </ul>
      </div>

      {/* --- MAIN CONTENT --- */}

      <div className="main-content">
        {/* Header */}
        <div className="top-header">
          <h4>DashBoard AI Analytics</h4>
          <span>
            Admin <i className="bi bi-person-circle fs-5 ms-1"></i>
          </span>
        </div>

        {/* Vùng nội dung Dashboard */}
        <div className="container-fluid px-4">
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body d-flex align-items-center gap-3">
                  <i className="bi bi-robot fs-3 text-primary"></i>
                  <div>
                    <h5 className="card-title mb-1 fw-bold">
                      Dự báo Nhu cầu Hành khách
                    </h5>
                    <p className="card-text text-muted small mb-0">
                      Hệ thống sử dụng Học máy (Machine Learning) để phân tích
                      dữ liệu lịch sử và dự báo.
                    </p>
                  </div>
                  <button
                    onClick={handleRunAIPipeline}
                    disabled={isCalculating}
                    className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
                    style={{
                      width: "auto",
                      whiteSpace: "nowrap",
                      padding: "8px 16px",
                    }}
                  >
                    {isCalculating ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        AI đang tính toán...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-cpu-fill"></i>
                        Chạy Tính Toán AI
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ================= KHU VỰC CHỈ SỐ AI NÂNG CAO ================= */}
          {currentTourInfo && currentTourInfo.r2Score !== undefined && (
            <div className="row mb-4">
              {/* 1. Thẻ KPI Độ chính xác R² */}
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card border-0 shadow-sm rounded-4 h-100 style-kpi">
                  <div className="card-body d-flex align-items-center justify-content-between p-4">
                    <div>
                      <h6 className="text-muted small text-uppercase fw-bold mb-1">
                        Độ Chính Xác Mô Hình
                      </h6>
                      <h2 className="fw-bold mb-0 text-success">
                        {(currentTourInfo.r2Score * 100).toFixed(1)}%
                      </h2>
                      <small className="text-muted">Chỉ số đánh giá</small>
                    </div>
                    <div
                      className="bg-success bg-opacity-10 text-success p-3 rounded-4 fs-3 d-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <i className="bi bi-shield-check"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Thẻ KPI Sai lệch dự báo MAE */}
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card border-0 shadow-sm rounded-4 h-100 style-kpi">
                  <div className="card-body d-flex align-items-center justify-content-between p-4">
                    <div>
                      <h6 className="text-muted small text-uppercase fw-bold mb-1">
                        Sai Lệch Trung Bình
                      </h6>
                      <h2 className="fw-bold mb-0 text-primary">
                        {currentTourInfo.mae?.toFixed(1)}
                      </h2>
                      <small className="text-muted">
                        Hành khách / Tháng (MAE)
                      </small>
                    </div>
                    <div
                      className="bg-primary bg-opacity-10 text-primary p-3 rounded-4 fs-3 d-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <i className="bi bi-graph-down-arrow"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Thẻ Đánh giá & Khuyến nghị thông minh tự động */}
              <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 bg-dark text-white">
                  <div className="card-body p-4 d-flex flex-column justify-content-center">
                    <h6 className="text-warning small text-uppercase fw-bold mb-2">
                      💡 Khuyến Nghị Hệ Thống
                    </h6>
                    <p
                      className="card-text small mb-0 opacity-75"
                      style={{ lineHeight: "1.5" }}
                    >
                      {currentTourInfo.r2Score > 0.8
                        ? currentTourInfo.mae < 5
                          ? "Mô hình đạt độ chính xác lý tưởng. Dữ liệu cực kỳ an toàn để phòng quản lý lên kế hoạch điều xe và đặt trước dịch vụ nhà hàng."
                          : "Độ khớp xu hướng rất tốt. Tuy nhiên biên độ sai số có dao động nhỏ, hãy dự phòng dư ra từ 3-5 chỗ khi đặt dịch vụ."
                        : currentTourInfo.r2Score > 0.5
                          ? "Mô hình dự báo ở mức độ khá. Khuyến nghị kết hợp thêm với các chương trình khuyến mãi kích cầu để đảm bảo lấp đầy tour."
                          : "Hệ thống nhận thấy dữ liệu quá khứ của tour này còn khá ít. Hãy tiếp tục tích lũy thêm lượt đặt tour để AI tối ưu thuật toán."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ============================================================= */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                {/* Bộ lọc chọn Tour */}
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                  <h6 className="fw-bold mb-0">
                    Biểu đồ đối chiếu Thực tế & Dự báo
                  </h6>
                  <div className="d-flex align-items-center gap-2">
                    <label className="text-muted small text-nowrap mb-0">
                      Chọn Tour:
                    </label>
                    <select
                      className="form-select form-select-sm shadow-none"
                      style={{ width: "250px" }}
                      value={selectedTourId}
                      onChange={(e) => setSelectedTourId(e.target.value)}
                    >
                      {/* Lặp qua danh sách tourList lấy từ DB để tạo thẻ option */}
                      {tourList.map((tour) => (
                        <option key={tour.id} value={tour.id}>
                          {tour.title} (ID: {tour.id} )
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Khu vực hiển thị Trạng thái và Biểu đồ */}
                <div style={{ height: "450px", position: "relative" }}>
                  {loading && (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Đang tải...</span>
                      </div>
                    </div>
                  )}

                  {!loading && error && (
                    <div
                      className="alert alert-warning text-center mt-5"
                      role="alert"
                    >
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>{" "}
                      {error}
                    </div>
                  )}

                  {!loading && !error && chartData && (
                    <Line data={lineChartData} options={lineChartOptions} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
