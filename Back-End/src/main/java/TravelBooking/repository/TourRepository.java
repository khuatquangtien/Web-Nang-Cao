package TravelBooking.repository;

import TravelBooking.entity.Tour;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    // Có thể thêm tìm kiếm theo địa điểm sau này:
    // List<Tour> findByDestination(String destination);
	List<Tour> findByTitleContainingIgnoreCase(String keyword);
    
    // Hoặc tìm theo địa điểm
    List<Tour> findByDestinationContainingIgnoreCase(String destination);
}