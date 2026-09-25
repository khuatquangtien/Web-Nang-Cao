package TravelBooking.features.booking.controller; // Sửa lại đúng package TravelBooking.controller của bạn

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.common.notification.EmailHotelService;
import TravelBooking.features.booking.dto.request.BookingHotelRequest;
import TravelBooking.features.booking.service.BookingService;

@RestController
@RequestMapping("/bookings/hotel")
// @CrossOrigin(origins = "*")
public class BookingHotelController {

    @Autowired
    private EmailHotelService emailHotelService;

    @Autowired
    private BookingService bookingService; // Gọi Repo khách sạn để lấy thông tin tên khách sạn

    @PostMapping("/book")
    public ResponseEntity<?> bookHotel(@RequestBody BookingHotelRequest request) {

        Map<String, Object> result = bookingService.bookHotel(request);

        return ResponseEntity.ok(result);
    }
}