package TravelBooking.features.tour.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TravelBooking.features.tour.entity.Review;
import TravelBooking.features.tour.entity.Tour;
import TravelBooking.features.tour.repository.ReviewRepository;
import TravelBooking.features.tour.repository.TourRepository;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private TourRepository tourRepository;

    // @Override
    // public List<Review> getAllReviewsById(Long tourId) {
    // Tour tour = tourRepository.findById(tourId).orElseThrow(() -> new
    // RuntimeException(" Tour không tồn tại "));

    // List<Review> listReview = tour.getReviews();

    // return listReview;
    // }

    // Hàm lưu đánh giá mới
    @Override
    public Review createReview(Review review) {
        // 1. Lưu đánh giá mới của User vào bảng Review
        Review savedReview = reviewRepository.save(review);

        // 2. Lấy ID của Tour vừa được đánh giá
        Long tourId = (long) review.getTourid();

        // 3. Gọi hàm tự động tính điểm trung bình từ Database
        Double average = reviewRepository.getAverageRatingByTourId(tourId);

        // Xử lý trường hợp null (nếu chưa có ai đánh giá thì mặc định là 0.0)
        if (average == null) {
            average = 0.0;
        }

        // Làm tròn lấy 1 chữ số thập phân (ví dụ: 4.56666 -> 4.6)
        double roundedAverage = Math.round(average * 10.0) / 10.0;

        // 4. Tìm Tour đó và Cập nhật điểm trung bình mới
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Tour!"));

        tour.setAverageRating(roundedAverage);

        // Lưu lại Tour với điểm mới
        tourRepository.save(tour);

        return savedReview;
    }
}
