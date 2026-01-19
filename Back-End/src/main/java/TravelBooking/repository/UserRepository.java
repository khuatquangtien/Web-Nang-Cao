package TravelBooking.repository;

import TravelBooking.entity.User; // <-- Dòng quan trọng nhất

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Tìm user theo username (trả về Optional để tránh lỗi null)
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
}