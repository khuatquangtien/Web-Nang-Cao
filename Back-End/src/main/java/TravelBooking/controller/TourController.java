package TravelBooking.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.entity.Tour;
import TravelBooking.repository.TourRepository;

@RestController
@RequestMapping("/tours")

public class TourController {

    @Autowired
    private TourRepository tourRepository;

    // 1. Lấy danh sách Tour
    @GetMapping
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    // 2. Thêm Tour mới
    @PostMapping
    public Tour createTour(@RequestBody Tour tour) {
        return tourRepository.save(tour);
    }

    // 3. Tìm kiếm tour theo tiêu đề
    @GetMapping("/search")
    public List<Tour> searchTours(@RequestParam String keyword) {
        // Lưu ý: Đảm bảo bên Repository đã có hàm findByTitleContainingIgnoreCase
        return tourRepository.findByTitleContainingIgnoreCase(keyword);
    }
    // 4. Tìm kiếm lấy các tour nổi bật
    @GetMapping("/search/getFeaturedTours")
    public List<Tour> getFeaturedTours(){
        // 👇 SỬA LẠI DÒNG NÀY:
        return tourRepository.findByFeaturedTrue(); 
    }
    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable Long id) {
        // Tìm trong DB xem có tour nào trùng ID không
        Optional<Tour> tour = tourRepository.findById(id);
        
        // Nếu có thì trả về dữ liệu, không thì báo lỗi 404
        if (tour.isPresent()) {
            return ResponseEntity.ok(tour.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}