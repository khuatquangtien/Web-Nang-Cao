package TravelBooking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TravelBooking.entity.User; // <-- Dòng quan trọng nhất

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	boolean existsByEmail(String email);
    // Tìm user theo username (trả về Optional để tránh lỗi null)
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
	Optional<User> findByEmail(String getEmail);
}