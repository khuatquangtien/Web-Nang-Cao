package TravelBooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import TravelBooking.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
//	Optional<Review> saveByReview(Review review);
	Optional<Review> findByTourid(Long tourid);
	@Query("SELECT AVG(r.rating) FROM Review r WHERE r.tourid = :tourId")
    Double getAverageRatingByTourId(@Param("tourId") Long tourId);

}
