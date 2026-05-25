package TravelBooking.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.entity.Booking;
import TravelBooking.repository.BookingRepository;

@RestController
@RequestMapping("/api/payment")
public class WebhookController {

    @Autowired
    private BookingRepository bookingRepository;

    // API hứng dữ liệu POST từ ngân hàng/bên thứ 3
    @PostMapping("/webhook")
    public ResponseEntity<String> receivePaymentWebhook(@RequestBody Map<String, Object> payload) {
        try {
            // 1. In toàn bộ dữ liệu ra màn hình đen (Console) để dễ debug
            System.out.println("========== CÓ BIẾN ĐỘNG SỐ DƯ ==========");
            System.out.println("Dữ liệu nhận được: " + payload);

            // 2. Lấy nội dung chuyển khoản ra từ payload
            // LƯU Ý: Chữ "description" có thể đổi thành "content" hoặc "memo" tùy vào bên thứ 3 bạn dùng
            String description = String.valueOf(payload.get("content"));

            // 3. Bóc tách ID đơn đặt tour từ nội dung chuyển khoản
            Long bookingId = extractBookingIdFromDescription(description);

            if (bookingId != null) {
                // 4. Tìm đơn hàng trong cơ sở dữ liệu
                Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);

                if (bookingOpt.isPresent()) {
                    Booking booking = bookingOpt.get();
                    
                    // 5. Cập nhật trạng thái thành ĐÃ THANH TOÁN (PAID)
                    booking.setStatus("PAID");
                    bookingRepository.save(booking);
                    
                    System.out.println(">>> Đã cập nhật thành công trạng thái thanh toán cho Booking ID: " + bookingId);
                    System.out.println("=========================================");
                    
                    // Bắt buộc phải trả về mã 200 OK để báo cho bên thứ 3 biết bạn đã nhận tin thành công
                    return ResponseEntity.ok("Đã nhận và xử lý webhook thành công!");
                } else {
                    System.out.println(">>> KHÔNG TÌM THẤY ĐƠN HÀNG MÃ SỐ: " + bookingId);
                }
            }
            
            return ResponseEntity.badRequest().body("Nội dung chuyển khoản không hợp lệ");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Lỗi hệ thống: " + e.getMessage());
        }
    }

    // Hàm phụ: Cắt chuỗi để lấy ra cái ID nằm ở cuối cùng
    // Ví dụ khách gửi: "Thanh toan don dat tour 62" -> Cắt ra số 62
    private Long extractBookingIdFromDescription(String description) {
        if (description == null || description.isEmpty() || description.equals("null")) {
            return null;
        }
        try {
            String[] parts = description.split(" ");
            // Lấy phần tử cuối cùng của mảng, hy vọng đó là cái ID
            return Long.parseLong(parts[parts.length - 1]);
        } catch (NumberFormatException e) {
            System.out.println(">>> Lỗi parse ID từ nội dung: " + description);
            return null;
        }
    }
}