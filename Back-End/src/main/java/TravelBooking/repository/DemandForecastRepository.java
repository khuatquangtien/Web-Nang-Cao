package TravelBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TravelBooking.entity.DemandForecast;

@Repository
public interface DemandForecastRepository extends JpaRepository<DemandForecast, Long> {
    
    // Hàm phụ: Tìm danh sách dự báo của một Tour cụ thể để vẽ biểu đồ
    List<DemandForecast> findByTourIdOrderByForecastMonthAsc(Long tourId);
}