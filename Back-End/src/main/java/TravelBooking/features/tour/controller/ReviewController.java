package TravelBooking.features.tour.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.features.hotel.entity.Hotel;
import TravelBooking.features.tour.entity.Review;
import TravelBooking.features.tour.repository.ReviewRepository;
import TravelBooking.features.tour.service.ReviewService;
import TravelBooking.features.tour.service.ReviewServiceImpl;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    // thêm phần review mỗi tour

    // // lấy đánh giá từ id tour
    // @GetMapping("/tour/{tourId}")
    // public ResponseEntity<List<Review>> getReviewsByTour(@PathVariable("tourId")
    // Long tourid) {
    // List<Review> result = reviewService.getReviewsByTour(tourid);
    // return ResponseEntity.ok(result);
    // }

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
