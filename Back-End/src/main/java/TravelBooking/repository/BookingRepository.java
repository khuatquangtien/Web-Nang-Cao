package TravelBooking.repository;

import TravelBooking.entity.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Sau này bạn có thể tìm booking theo user:
    List<Booking> findByUserId(Long userId);
	
}