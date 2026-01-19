package TravelBooking.repository;

import TravelBooking.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {

    // 1. Lấy danh sách tour nổi bật
    List<Tour> findByFeaturedTrue();

    List<Tour> findByCityContainingIgnoreCase(String city);
    
    // Hoặc giữ nguyên tìm theo Title như cũ (khuyên dùng cái này cho ô tìm kiếm chung)
    List<Tour> findByTitleContainingIgnoreCase(String keyword);
    
    //
}