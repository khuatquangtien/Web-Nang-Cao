package TravelBooking.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "demand_forecasts")
public class DemandForecast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Liên kết nhiều dự báo về 1 tour (Mối quan hệ ManyToOne với bảng tours)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour; // Nhớ đổi tên class Tour cho đúng với dự án của bạn

    // Tháng dự báo (Ví dụ lưu ngày đầu tiên của tháng đó: 2026-06-01)
    @Column(name = "forecast_month", nullable = false)
    private LocalDate forecastMonth;

    // Số lượng khách dự báo (Do Python tính toán và điền vào)
    @Column(name = "predicted_passengers")
    private Integer predictedPassengers;

    // Số lượng khách thực tế đi trong tháng đó (Để sau này tính độ lệch)
    @Column(name = "actual_passengers")
    private Integer actualPassengers;

    @Column(name = "mae")
    private Double mae;

    @Column(name = "r2_score")
    private Double r2Score;
    public Double getMae() {
		return mae;
	}
	public void setMae(Double mae) {
		this.mae = mae;
	}
	public Double getR2Score() {
		return r2Score;
	}
	public void setR2Score(Double r2Score) {
		this.r2Score = r2Score;
	}
	// --- GETTER AND SETTER (Hoặc dùng @Data nếu dự án có cài Lombok) ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Tour getTour() { return tour; }
    public void setTour(Tour tour) { this.tour = tour; }

    public LocalDate getForecastMonth() { return forecastMonth; }
    public void setForecastMonth(LocalDate forecastMonth) { this.forecastMonth = forecastMonth; }

    public Integer getPredictedPassengers() { return predictedPassengers; }
    public void setPredictedPassengers(Integer predictedPassengers) { this.predictedPassengers = predictedPassengers; }

    public Integer getActualPassengers() { return actualPassengers; }
    public void setActualPassengers(Integer actualPassengers) { this.actualPassengers = actualPassengers; }
}
