package TravelBooking.features.booking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.common.dto.response.ApiResponse;
import TravelBooking.features.Transport.entity.Transport;

import TravelBooking.features.booking.dto.request.BookingTransportRequest;
import TravelBooking.features.booking.entity.Booking;
import TravelBooking.features.booking.service.BookingService;

@RestController
public class BookingTransportController {

    BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<Transport>> bookTransport(@RequestBody BookingTransportRequest request) {
        bookingService.BookingTransport(request);

    }
}
