package TravelBooking.features.booking.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.features.booking.dto.request.UpdateBooKingRequest;
import TravelBooking.features.booking.entity.Booking;
import TravelBooking.features.booking.service.BookingService;

// Đặt tour
@RestController
@RequestMapping("/bookings/tour")
// @CrossOrigin(origins = "http://localhost:3000") // 👈 Thêm dòng này (Cho phép
// React gọi vào)
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        Map<String, Object> result = bookingService.createBooking(booking);
        return ResponseEntity.ok(result);
    }

    // lấy tất cả các danh sách
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Lịch sử tour
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.findByUserId(userId);
    }

    // chi tieest 1 tour
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) { // Sửa bookingId thành id
        return bookingService.findByBookingId(id);
    }

    // 2. API CẬP NHẬT TRẠNG THÁI (Cho nút Duyệt/Hủy bên Admin)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id,
            @RequestBody UpdateBooKingRequest request) {
        bookingService.updateBookingStatus(id, request);
        return ResponseEntity.ok("Cập nhật thành công");
    }

    // 3. API XÓA (Nếu muốn nút Xóa hoạt động)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Đã xoá thành công ");
    }

    // API này được gọi khi khách hàng click vào nút trong Email
    @GetMapping("/confirm/{bookingId}")
    public ResponseEntity<String> confirmBookingEmail(@PathVariable Long bookingId) {
        return bookingService.confirmBookingEmail(bookingId);
    }
    // }
    // @PostMapping("/webhook")
    // public ResponseEntity<?> handlePaymentWebhook(@RequestBody Map<String,
    // Object> payload) {
    // try {
    // System.out.println(">>> CÓ BIẾN ĐỘNG SỐ DƯ! Dữ liệu Webhook nhận được: " +
    // payload);

    // // 1. Lấy nội dung chuyển khoản từ payload (Ví dụ: "Thanh toan don dat tour
    // 62")
    // // (Cấu trúc payload phụ thuộc vào bên thứ 3 bạn chọn)
    // String description = (String) payload.get("description");

    // // 2. Tách lấy ID của đơn hàng từ chuỗi nội dung
    // Long bookingId = extractBookingIdFromDescription(description);

    // if (bookingId != null) {
    // // 3. Tìm đơn hàng trong Database
    // Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);

    // if (bookingOpt.isPresent()) {
    // Booking booking = bookingOpt.get();

    // // 4. Cập nhật trạng thái thành ĐÃ THANH TOÁN
    // booking.setStatus("PAID");
    // bookingRepository.save(booking);
    // System.out.println(">>> Đã cập nhật thành công đơn hàng: " + bookingId);
    // }
    // }

    // // Phải trả về 200 OK để báo cho bên thứ 3 biết mình đã nhận được tin
    // return ResponseEntity.ok().body("Webhook received successfully");

    // } catch (Exception e) {
    // e.printStackTrace();
    // return ResponseEntity.internalServerError().body("Error processing webhook");
    // }
    // }

    // // Hàm phụ trợ để tách số 62 từ chuỗi "Thanh toan don dat tour 62"
    // //Ham này dùng để báo cáo thanh toán
    // private Long extractBookingIdFromDescription(String description) {
    // try {
    // // Logic cắt chuỗi tùy thuộc vào cú pháp nội dung chuyển khoản bạn quy định
    // String[] parts = description.split(" ");
    // return Long.parseLong(parts[parts.length - 1]);
    // } catch (Exception e) {
    // return null;
    // }
    // }

}