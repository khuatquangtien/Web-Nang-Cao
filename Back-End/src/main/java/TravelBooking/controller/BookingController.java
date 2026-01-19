package TravelBooking.controller;

import TravelBooking.entity.Booking;
import TravelBooking.entity.Tour; // Import Tour
import TravelBooking.repository.BookingRepository;
import TravelBooking.repository.TourRepository; // Import TourRepository
import jakarta.validation.Valid;
import TravelBooking.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TourRepository tourRepository; 
    
    @Autowired
    private EmailService emailService;
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            // 1. Lưu đơn đặt tour vào Database như bình thường
            Booking savedBooking = bookingRepository.save(booking);

            // 👇 3. Thêm đoạn code gửi Email này vào ngay sau khi lưu thành công
            // Kiểm tra xem User và Email có tồn tại không để tránh lỗi
            if (savedBooking.getUser() != null && savedBooking.getUser().getEmail() != null) {
                
                // Dùng Thread mới để gửi mail "ngầm", giúp React không bị đơ khi chờ mail gửi đi
                new Thread(() -> {
                    emailService.sendHtmlEmail(
                        savedBooking.getUser().getEmail(),          // Gửi đến email của khách
                        "Xác nhận đơn đặt tour #" + savedBooking.getId(), // Tiêu đề mail
                        savedBooking.getUser().getUsername(),       // Tên khách hàng
                        savedBooking.getTour().getTitle(),          // Tên Tour
                        savedBooking.getBookingDate().toString(),   // Ngày đi
                        savedBooking.getNumPeople(),                // Số người
                        savedBooking.getTotalPrice()                // Tổng tiền
                    );
                }).start();
            }

            return ResponseEntity.ok(savedBooking);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi đặt tour: " + e.getMessage());
        }
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
    // xem chi tiết đơn, lấy thông tin booking theo id
    @GetMapping("/{id}")
    public Optional<Booking> getBookingById(@PathVariable Long bookingId){
		return bookingRepository.findById( bookingId);
    	
    }
}