package TravelBooking.controller; // Sửa lại đúng package TravelBooking.controller của bạn

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.dto.BookingHotelRequest;
import TravelBooking.entity.Hotel;
import TravelBooking.repository.HotelRepository;
import TravelBooking.service.EmailHotelService;
import TravelBooking.service.EmailService;

@RestController
@RequestMapping("/bookings/hotel")
//@CrossOrigin(origins = "*")
public class BookingHotelController {

    @Autowired
    private EmailHotelService emailHotelService;

    @Autowired
    private HotelRepository hotelRepository; // Gọi Repo khách sạn để lấy thông tin tên khách sạn

    @PostMapping("/book")
    public ResponseEntity<?> bookHotel(@RequestBody BookingHotelRequest request) {
        
        // 1. Tìm thông tin khách sạn trong DB để lấy ra cái Tên Khách Sạn chính xác
        Optional<Hotel> hotelOpt = hotelRepository.findById(request.getHotelId());
        String hotelName = hotelOpt.isPresent() ? hotelOpt.get().getName() : "Khách sạn hệ thống";

        // 2. [Thêm code lưu vào bảng hotel_booking của bạn tại đây nếu có]
        // hotelBookingRepository.save(newBooking);

        // 3. Tiến hành gửi Gmail xác nhận cho khách hàng
        try {
            emailHotelService.sendHotelBookingConfirmation(
                request.getCustomerEmail(),
                request.getCustomerName(),
                hotelName,
                request.getCheckInDate()
            );
            System.out.println("📧 Đã gửi Gmail xác nhận đặt phòng tới: " + request.getCustomerEmail());
        } catch (Exception e) {
            System.err.println("❌ Lỗi khi gửi mail: " + e.getMessage());
            // Bạn vẫn có thể cho đặt phòng thành công dù mail gặp sự cố hy hữu
        }

        // 4. Trả kết quả phản hồi về cho ứng dụng React Native
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Đặt phòng thành công! Bản sao xác nhận đã được gửi vào Gmail của bạn.");
        
        return ResponseEntity.ok(response);
    }
}