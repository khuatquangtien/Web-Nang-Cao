package TravelBooking.features.booking.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import TravelBooking.features.booking.dto.request.BookingHotelRequest;
import TravelBooking.features.booking.dto.request.UpdateBooKingRequest;
import TravelBooking.features.booking.entity.Booking;

public interface BookingService {
    List<Booking> getAllBookings();

    List<Booking> findByUserId(Long userId);

    Booking findByBookingId(Long id);

    ResponseEntity updateBookingStatus(Long id, UpdateBooKingRequest request);

    void deleteBooking(Long id);

    ResponseEntity<String> confirmBookingEmail(Long id);

    Map<String, Object> createBooking(Booking booking);

    Map<String, Object> bookHotel(BookingHotelRequest request);

    Map<String, Object> receivePaymentWebhook(Map<String, Object> payload);
}
