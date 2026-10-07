package TravelBooking.features.booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.common.dto.response.ApiResponse;
import TravelBooking.features.booking.dto.request.BookingTransportRequest;
import TravelBooking.features.booking.dto.response.BookingTransportResponse;
import TravelBooking.features.booking.service.BookingService;
import jakarta.validation.Valid;
import lombok.val;

@RestController
@RequestMapping("/booking/transport")
public class BookingTransportController {

    @Autowired
    BookingService bookingService;

    @PostMapping("/book")
    public ResponseEntity<ApiResponse<BookingTransportResponse>> bookTransport(
            @RequestBody @Valid BookingTransportRequest request) {
        BookingTransportResponse res = bookingService.BookingTransport(request);
        return ResponseEntity.ok(ApiResponse.success("Thuê xe thành công", res));

    }
}
