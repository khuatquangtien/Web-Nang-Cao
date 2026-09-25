package TravelBooking.features.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TravelBooking.features.booking.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Sau này bạn có thể tìm booking theo user:
    List<Booking> findByUserId(Long userId);

    // số lượng đặt tour theo từng tour
    Integer countByTourId(Integer num);

}