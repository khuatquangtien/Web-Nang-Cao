package TravelBooking.features.tour.controller;

import java.util.List;

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

import TravelBooking.common.dto.ApiResponse;
import TravelBooking.features.tour.entity.Tour;
import TravelBooking.features.tour.service.TourService;

@RestController
@RequestMapping("/tours")
public class TourController {

    @Autowired
    private TourService tourService;

    // 1. Lấy danh sách Tour
    @GetMapping
    public ResponseEntity<ApiResponse<List<Tour>>> getAllTours() {
        return ResponseEntity.ok(ApiResponse.success(tourService.getAllTours()));
    }

    // 2. Thêm Tour mới (Dành cho Admin)
    @PostMapping
    public ResponseEntity<ApiResponse<Tour>> createTour(@RequestBody Tour tour) {
        Tour createdTour = tourService.createTour(tour);
        return ResponseEntity.ok(ApiResponse.success("Tạo tour thành công", createdTour));
    }

    // 3. Tìm kiếm tour theo tiêu đề
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Tour>>> searchTours(@RequestParam String keyword) {
        return ResponseEntity.ok(ApiResponse.success(tourService.searchTours(keyword)));
    }

    // 4. Tìm kiếm lấy các tour nổi bật
    @GetMapping("/search/getFeaturedTours")
    public ResponseEntity<ApiResponse<List<Tour>>> getFeaturedTours() {
        return ResponseEntity.ok(ApiResponse.success(tourService.getFeaturedTours()));
    }

    // 5. Chi tiết 1 tour
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Tour>> getTourById(@PathVariable Long id) {
        Tour tour = tourService.getTourById(id);
        return ResponseEntity.ok(ApiResponse.success(tour));
    }

    // 6. Xóa Tour theo ID (Admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.ok(ApiResponse.success("Đã xóa tour thành công!", null));
    }

    // 7. Cập nhật thông tin Tour (Admin)
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Tour>> updateTour(@PathVariable Long id, @RequestBody Tour tourDetails) {
        Tour updated = tourService.updateTour(id, tourDetails);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật tour thành công!", updated));
    }
}