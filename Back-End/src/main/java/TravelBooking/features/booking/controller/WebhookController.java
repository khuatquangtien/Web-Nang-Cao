package TravelBooking.features.booking.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.features.booking.service.BookingService;

@RestController
@RequestMapping("/api/payment")
public class WebhookController {

    @Autowired
    private BookingService bookingService;

    // API hứng dữ liệu POST từ ngân hàng/bên thứ 3
    @PostMapping("/webhook")
    public ResponseEntity<?> receivePaymentWebhook(@RequestBody Map<String, Object> payload) {

        Map<String, Object> result = bookingService.receivePaymentWebhook(payload);

        return ResponseEntity.ok(result);
    }

}