package TravelBooking.controller;

import TravelBooking.entity.Booking;
import TravelBooking.entity.Tour; // Import Tour
import TravelBooking.entity.User;
import TravelBooking.repository.BookingRepository;
import TravelBooking.repository.TourRepository; // Import TourRepository
import TravelBooking.repository.UserRepository;
import TravelBooking.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/bookings/tour")
//@CrossOrigin(origins = "http://localhost:3000") // 👈 Thêm dòng này (Cho phép React gọi vào)
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TourRepository tourRepository; 
    
    @Autowired
    private EmailService emailService;
    
    @Autowired 
    private UserRepository userRepository;
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
    	System.out.println("======> ĐÃ CHẠY VÀO ĐƯỢC CONTROLLER ĐẶT TOUR! <======");
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
            Tour tour = tourRepository.findById(booking.getTour().getId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Tour với ID này!"));
            booking.setTour(tour);

            User user = userRepository.findById(booking.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy User với ID này!"));
            booking.setUser(user);
            
            // --- BƯỚC 3: LƯU VÀO DATABASE ---
            Booking savedBooking = bookingRepository.save(booking);
            // Set ngược lại vào booking để đảm bảo đầy đủ dữ liệu khi lưu
            
            // (Nếu bạn có UserRepository thì làm tương tự với User, tạm thời ta giả định User gửi lên đúng)

    
            // --- BƯỚC 4: GỬI EMAIL 
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
                            savedBooking.getTotalPrice(), 
                            savedBooking.getId()
                        );
                    } catch (Exception ex) {
                        System.err.println("Lỗi gửi mail: " + ex.getMessage());
                    }
                }).start();
            }

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("message", "Đặt tour thành công");
            responseData.put("bookingId", savedBooking.getId()); 

            return ResponseEntity.ok(responseData);
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi ra console để dễ debug
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi đặt tour: " + e.getMessage());
        }
    }
    // lấy tất cả các danh sách
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    // Lịch sử tour 
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    //t
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) { // Sửa bookingId thành id
        Optional<Booking> booking = bookingRepository.findById(id);
        return booking.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 2.  API CẬP NHẬT TRẠNG THÁI (Cho nút Duyệt/Hủy bên Admin)
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
                System.out.println(">>> ID đơn hàng cần update: " + id);
                System.out.println(">>> Trạng thái mới nhận được: " + newStatus);
                return ResponseEntity.ok("Cập nhật trạng thái thành công!");
            } else {
                return ResponseEntity.badRequest().body("Thiếu trạng thái (status)!");
            }
           
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi: " + e.getMessage());
        }
 
        
    }
    
    // 3.  API XÓA (Nếu muốn nút Xóa hoạt động)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        try {
            bookingRepository.deleteById(id);
            return ResponseEntity.ok("Đã xóa đơn hàng thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xóa");
        }
    }
 // API này được gọi khi khách hàng click vào nút trong Email
    @GetMapping("/confirm/{bookingId}")
    public ResponseEntity<String> confirmBookingEmail(@PathVariable Long bookingId) {
    	System.out.println("Debug ........=========");
        try {
            Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
            
            if (bookingOpt.isPresent()) {
                Booking booking = bookingOpt.get();
                String currentStatus = booking.getStatus();
                
                // 2. SỬA ĐIỀU KIỆN IF: Chấp nhận cả "PENDING" hoặc "Đang chờ" để không bị nhảy vào else
                if ("PENDING".equalsIgnoreCase(currentStatus) || "Đang chờ".equalsIgnoreCase(currentStatus)) {
                    
                    // 3. CẬP NHẬT TRẠNG THÁI MỚI: Nên dùng chữ "CONFIRMED" hoặc "Đã xác nhận" tùy bạn quy định
                    booking.setStatus("CONFIRMED"); 
                    bookingRepository.save(booking); // Lưu lại vào DB
                    
                    String htmlResponse = "<html><body style='text-align:center; padding:50px; font-family:Arial;'>"
                            + "<div style='max-width:500px; margin:0 auto; background:#fff; padding:30px; border-radius:10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);'>"
                            + "<h2 style='color:#28a745;'>🎉 Xác nhận đặt tour thành công!</h2>"
                            + "<p>Cảm ơn bạn. Chuyến đi của bạn đã được hệ thống ghi nhận thành công.</p>"
                            + "<a href='http://localhost:3000' style='display:inline-block; margin-top:20px; padding:10px 20px; background:#faa935; color:white; text-decoration:none; border-radius:5px;'>Quay lại trang chủ</a>"
                            + "</div></body></html>";
                    return ResponseEntity.ok().body(htmlResponse);
                } else {
                    // Nếu status hiện tại đã là CONFIRMED hoặc trạng thái khác, báo cho khách biết
                    return ResponseEntity.ok("<html><body style='text-align:center; padding:50px; font-family:Arial;'>"
                            + "<h2>Đơn đặt tour này đã được xác nhận hoặc đã hủy trước đó!</h2>"
                            + "<p>Trạng thái hiện tại: <b>" + currentStatus + "</b></p>"
                            + "</body></html>");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy đơn đặt tour!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi hệ thống: " + e.getMessage());
        }
    }
    @PostMapping("/webhook")
    public ResponseEntity<?> handlePaymentWebhook(@RequestBody Map<String, Object> payload) {
        try {
            System.out.println(">>> CÓ BIẾN ĐỘNG SỐ DƯ! Dữ liệu Webhook nhận được: " + payload);

            // 1. Lấy nội dung chuyển khoản từ payload (Ví dụ: "Thanh toan don dat tour 62")
            // (Cấu trúc payload phụ thuộc vào bên thứ 3 bạn chọn)
            String description = (String) payload.get("description"); 
            
            // 2. Tách lấy ID của đơn hàng từ chuỗi nội dung
            Long bookingId = extractBookingIdFromDescription(description);

            if (bookingId != null) {
                // 3. Tìm đơn hàng trong Database
                Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
                
                if (bookingOpt.isPresent()) {
                    Booking booking = bookingOpt.get();
                    
                    // 4. Cập nhật trạng thái thành ĐÃ THANH TOÁN
                    booking.setStatus("PAID");
                    bookingRepository.save(booking);
                    System.out.println(">>> Đã cập nhật thành công đơn hàng: " + bookingId);
                }
            }

            // Phải trả về 200 OK để báo cho bên thứ 3 biết mình đã nhận được tin
            return ResponseEntity.ok().body("Webhook received successfully");
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error processing webhook");
        }
    }

    // Hàm phụ trợ để tách số 62 từ chuỗi "Thanh toan don dat tour 62"
    private Long extractBookingIdFromDescription(String description) {
        try {
            // Logic cắt chuỗi tùy thuộc vào cú pháp nội dung chuyển khoản bạn quy định
            String[] parts = description.split(" ");
            return Long.parseLong(parts[parts.length - 1]);
        } catch (Exception e) {
            return null;
        }
    }
    
}