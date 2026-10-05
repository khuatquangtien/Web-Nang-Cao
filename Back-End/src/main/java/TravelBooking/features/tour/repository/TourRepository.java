package TravelBooking.features.tour.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TravelBooking.features.tour.entity.Tour;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {

    // 1. Lấy danh sách tour nổi bật
    // List<Tour> findByFeaturedTrue();

    List<Tour> findByCityContainingIgnoreCase(String city);

    // Hoặc giữ nguyên tìm theo Title như cũ (khuyên dùng cái này cho ô tìm kiếm
    // chung)
    List<Tour> findByTitleContainingIgnoreCase(String keyword);

    Page<Tour> findByFeaturedTrue(Pageable pageable);
}