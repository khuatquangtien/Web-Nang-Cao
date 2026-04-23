package TravelBooking.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.entity.Review;
import TravelBooking.repository.ReviewRepository;
import TravelBooking.service.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
	@Autowired
    private ReviewRepository reviewRepository;
	
	@Autowired
    private ReviewService reviewService;
	// thêm phần review mỗi tour
   
    // lấy đánh giá từ id tour
    @GetMapping("/tour/{tourId}")
    public Optional<Review> getReviewsByTour(@PathVariable Long tourid) {
        return reviewRepository.findByTourid(tourid);
    }
    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody Review review) {
        try {
            // Gọi hàm xử lý mà chúng ta vừa viết ở bước trước
            Review savedReview = reviewService.createReview(review);
            return ResponseEntity.ok(savedReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi thêm đánh giá: " + e.getMessage());
        }
    }
}
