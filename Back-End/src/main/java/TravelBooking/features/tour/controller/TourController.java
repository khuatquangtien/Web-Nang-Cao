package TravelBooking.features.tour.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.features.tour.entity.Tour;
import TravelBooking.features.tour.repository.TourRepository;
import TravelBooking.features.tour.service.TourService;

@RestController
@RequestMapping("/tours")

public class TourController {

    @Autowired
    private TourService tourService;

    // 1. Lấy danh sách Tour
    @GetMapping
    public ResponseEntity<List<Tour>> getAllTours() {
        return ResponseEntity.ok(tourService.getAllTours());
    }

    // 2. Thêm Tour mới
    @PostMapping
    public ResponseEntity<Tour> createTour(@RequestBody Tour tour) {
        return ResponseEntity.ok(tourService.createTour(tour));
    }

    // 3. Tìm kiếm tour theo tiêu đề
    @GetMapping("/search")
    public ResponseEntity<List<Tour>> searchTours(@RequestParam String keyword) {
        // Lưu ý: Đảm bảo bên Repository đã có hàm findByTitleContainingIgnoreCase
        return ResponseEntity.ok(tourService.searchTours(keyword));
    }

    // 4. Tìm kiếm lấy các tour nổi bật
    @GetMapping("/search/getFeaturedTours")
    public ResponseEntity<List<Tour>> getFeaturedTours() {
        return ResponseEntity.ok(tourService.getFeaturedTours());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable Long id) {
        Tour tour = tourService.getTourById(id);

        // Tìm trong DB xem có tour nào trùng ID không
        return ResponseEntity.ok(tour);
    }

    // API xoá cho admin
    // 5. Xóa Tour theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTour(@PathVariable Long id) {
        // Kiểm tra xem tour có tồn tại không
        tourService.deleteTour(id);
        return ResponseEntity.ok().body("Đã xóa tour thành công!");
    }

    // API sửa tour cho admin
    // 6. Cập nhật (Sửa) thông tin Tour
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTour(@PathVariable Long id, @RequestBody Tour tourDetails) {
        tourService.updateTour(id, tourDetails);
        return ResponseEntity.ok().body("Đã cập nhật tour thành công!");
    }
}