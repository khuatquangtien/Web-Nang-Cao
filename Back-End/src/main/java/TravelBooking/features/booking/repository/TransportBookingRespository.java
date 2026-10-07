package TravelBooking.features.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TravelBooking.features.Transport.entity.Transport;
import TravelBooking.features.booking.entity.TransportBooking;

@Repository
public interface TransportBookingRespository extends JpaRepository<TransportBooking, Long> {

}
