package TravelBooking.features.Transport.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TravelBooking.features.Transport.entity.Transport;

@Repository
public interface TransportRepository extends JpaRepository<Transport, Long> {

    
}
