package TravelBooking.controller;

import TravelBooking.entity.Booking;
import TravelBooking.entity.Tour; // Import Tour
import TravelBooking.repository.BookingRepository;
import TravelBooking.repository.TourRepository; // Import TourRepository
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TourRepository tourRepository; // 1. Cần thêm cái này để lấy giá Tour

    @PostMapping
    public Booking createBooking(@RequestBody @Valid Booking booking) {
        // 2. Lấy thông tin Tour đầy đủ từ Database dựa trên ID gửi lên
        Tour tour = tourRepository.findById(booking.getTour().getId()).orElse(null);

        // 3. Tính toán tổng tiền
        if (tour != null) {
            booking.setTour(tour); // Gán lại tour đầy đủ vào booking
            double calculatedPrice = tour.getPrice() * booking.getNumPeople();
            booking.setTotalPrice(calculatedPrice); // Gán tổng tiền
        }

        booking.setStatus("PENDING");
        return bookingRepository.save(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    // Lịch sử tour 
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }
}