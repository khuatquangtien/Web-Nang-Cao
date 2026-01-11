package TravelBooking.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
    // 3. Tìm kiếm tour
    @GetMapping("/search")
    public List<Tour> searchTours(@RequestParam String keyword) {
        return tourRepository.findByTitleContainingIgnoreCase(keyword);
    }
    
}