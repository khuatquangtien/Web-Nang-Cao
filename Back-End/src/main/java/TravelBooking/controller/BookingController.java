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
@CrossOrigin(origins = "http://localhost:3000") // 👈 Thêm dòng này (Cho phép React gọi vào)
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
            // --- BƯỚC 1: KIỂM TRA DỮ LIỆU ĐẦU VÀO ---
            // Nếu người dùng quên gửi ID tour hoặc User
            if (booking.getTour() == null || booking.getTour().getId() == null) {
                return ResponseEntity.badRequest().body("Lỗi: Phải chọn Tour (tour.id)!");
            }
            if (booking.getUser() == null || booking.getUser().getId() == null) {
                return ResponseEntity.badRequest().body("Lỗi: Phải có thông tin người dùng (user.id)!");
            }

            // --- BƯỚC 2: TÌM TOUR VÀ USER TỪ DB (Để đảm bảo dữ liệu tồn tại) ---
            // Code cũ của bạn import tourRepository nhưng chưa dùng, giờ ta sẽ dùng nó:
            Tour tour = tourRepository.findById(booking.getTour().getId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Tour với ID này!"));
            
            // Set ngược lại vào booking để đảm bảo đầy đủ dữ liệu khi lưu
            booking.setTour(tour);
            
            // (Nếu bạn có UserRepository thì làm tương tự với User, tạm thời ta giả định User gửi lên đúng)

            // --- BƯỚC 3: LƯU VÀO DATABASE ---
            Booking savedBooking = bookingRepository.save(booking);

            // --- BƯỚC 4: GỬI EMAIL (Code của bạn đã viết tốt) ---
            if (savedBooking.getUser() != null && savedBooking.getUser().getEmail() != null) {
                new Thread(() -> {
                    try {
                        emailService.sendHtmlEmail(
                            savedBooking.getUser().getEmail(),          
                            "Xác nhận đơn đặt tour #" + savedBooking.getId(), 
                            savedBooking.getUser().getUsername(),       
                            savedBooking.getTour().getTitle(),          
                            savedBooking.getBookingDate().toString(),   
                            savedBooking.getNumPeople(),                
                            savedBooking.getTotalPrice()                
                        );
                    } catch (Exception ex) {
                        System.err.println("Lỗi gửi mail: " + ex.getMessage());
                    }
                }).start();
            }

            return ResponseEntity.ok(savedBooking);

        } catch (Exception e) {
            e.printStackTrace(); // In lỗi ra console để dễ debug
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
 // ... Các code cũ giữ nguyên ...

    // 1. SỬA LẠI HÀM LẤY CHI TIẾT (Fix lỗi tên biến)
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) { // Sửa bookingId thành id
        Optional<Booking> booking = bookingRepository.findById(id);
        return booking.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 2. THÊM API CẬP NHẬT TRẠNG THÁI (Cho nút Duyệt/Hủy bên Admin)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> request) {
        try {
            Booking booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng!"));

            // Lấy status từ body gửi lên (Ví dụ: {"status": "CONFIRMED"})
            String newStatus = request.get("status");
            
            if (newStatus != null) {
                booking.setStatus(newStatus);
                bookingRepository.save(booking);
                return ResponseEntity.ok("Cập nhật trạng thái thành công!");
            } else {
                return ResponseEntity.badRequest().body("Thiếu trạng thái (status)!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi: " + e.getMessage());
        }
    }
    
    // 3. THÊM API XÓA (Nếu muốn nút Xóa hoạt động)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        try {
            bookingRepository.deleteById(id);
            return ResponseEntity.ok("Đã xóa đơn hàng thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xóa");
        }
    }
    
}