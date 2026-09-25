package TravelBooking.features.hotel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import TravelBooking.features.hotel.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
	List<Hotel> findByNameContainingIgnoreCase(String keyword);

	List<Hotel> findTop5ByOrderByAverageRatingDesc();

}
