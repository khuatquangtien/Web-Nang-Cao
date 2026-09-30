package TravelBooking.features.booking.service;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import TravelBooking.features.booking.dto.request.BookingHotelRequest;
import TravelBooking.features.booking.dto.request.BookingTourRequest;
import TravelBooking.features.booking.dto.request.UpdateBooKingRequest;
import TravelBooking.features.booking.dto.response.BookingResponse;
import TravelBooking.features.booking.entity.Booking;

public interface BookingService {
    List<BookingResponse> getAllBookings();

    List<BookingResponse> findByUserId(Long userId);

    BookingResponse findByBookingId(Long id);

    ResponseEntity updateBookingStatus(Long id, UpdateBooKingRequest request);

    void deleteBooking(Long id);

    ResponseEntity<String> confirmBookingEmail(Long id);

    Map<String, Object> createBooking(BookingTourRequest booking, String username);

    List<BookingResponse> getMyBookings(String username);

    Map<String, Object> bookHotel(BookingHotelRequest request);

    Map<String, Object> receivePaymentWebhook(Map<String, Object> payload);
}
