package TravelBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import TravelBooking.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
	List<Hotel> findByNameContainingIgnoreCase(String keyword);

	List<Hotel> findTop5ByOrderByAverageRatingDesc();
	
}
