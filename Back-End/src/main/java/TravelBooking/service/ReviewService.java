package TravelBooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TravelBooking.entity.Review;
import TravelBooking.entity.Tour;
import TravelBooking.repository.ReviewRepository;
import TravelBooking.repository.TourRepository;
@Service
public class ReviewService {
	@Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private TourRepository tourRepository;

    // Hàm lưu đánh giá mới
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
