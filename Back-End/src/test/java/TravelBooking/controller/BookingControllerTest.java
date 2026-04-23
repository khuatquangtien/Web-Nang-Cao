package TravelBooking.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import TravelBooking.entity.Booking;
import TravelBooking.entity.Tour;
import TravelBooking.entity.User;
import TravelBooking.repository.BookingRepository;
import TravelBooking.repository.TourRepository;
import TravelBooking.service.EmailService;

@ExtendWith(MockitoExtension.class)
public class BookingControllerTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private TourRepository tourRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private BookingController bookingController;

    // ==========================================
    // TC01: Đặt tour thành công
    // ==========================================
    @Test
    public void testCreateBooking_Success() {
        // 1. Chuẩn bị dữ liệu (Arrange)
        Tour mockTour = new Tour();
        mockTour.setId(1L);

        User mockUser = new User();
        mockUser.setId(1L);

        Booking bookingRequest = new Booking();
        bookingRequest.setTour(mockTour);
        bookingRequest.setUser(mockUser);

        // Giả lập DB: Tìm thấy Tour
        when(tourRepository.findById(1L)).thenReturn(Optional.of(mockTour));
        // Giả lập DB: Lưu thành công
        when(bookingRepository.save(any(Booking.class))).thenReturn(bookingRequest);

        // 2. Thực thi (Act)
        ResponseEntity<?> response = bookingController.createBooking(bookingRequest);

        // 3. Đối chiếu (Assert)
        assertEquals(HttpStatus.OK, response.getStatusCode(), "Phải trả về 200 OK");
        verify(bookingRepository).save(any(Booking.class)); // Đảm bảo hàm save được gọi
    }

    // ==========================================
    // TC02: Đặt tour thất bại do thiếu Tour ID
    // ==========================================
    @Test
    public void testCreateBooking_Fail_NoTour() {
        Booking bookingRequest = new Booking();
        // Không set Tour cho booking

        ResponseEntity<?> response = bookingController.createBooking(bookingRequest);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Lỗi: Phải chọn Tour (tour.id)!", response.getBody());
    }

    // ==========================================
    // TC03: Đặt tour thất bại do thiếu User ID
    // ==========================================
    @Test
    public void testCreateBooking_Fail_NoUser() {
        Tour mockTour = new Tour();
        mockTour.setId(1L);
        
        Booking bookingRequest = new Booking();
        bookingRequest.setTour(mockTour);
        // Không set User cho booking

        ResponseEntity<?> response = bookingController.createBooking(bookingRequest);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Lỗi: Phải có thông tin người dùng (user.id)!", response.getBody());
    }

    // ==========================================
    // TC04: Lấy đơn hàng theo ID thành công
    // ==========================================
    @Test
    public void testGetBookingById_Found() {
        Booking mockBooking = new Booking();
        mockBooking.setId(1L);

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(mockBooking));

        ResponseEntity<Booking> response = bookingController.getBookingById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockBooking, response.getBody());
    }

    // ==========================================
    // TC05: Lấy đơn hàng thất bại do không tồn tại
    // ==========================================
    @Test
    public void testGetBookingById_NotFound() {
        when(bookingRepository.findById(99L)).thenReturn(Optional.empty());

        ResponseEntity<Booking> response = bookingController.getBookingById(99L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    // ==========================================
    // TC06: Cập nhật trạng thái thành công
    // ==========================================
    @Test
    public void testUpdateStatus_Success() {
        Booking mockBooking = new Booking();
        mockBooking.setId(1L);
        mockBooking.setStatus("PENDING");

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(mockBooking));

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("status", "CONFIRMED");

        ResponseEntity<?> response = bookingController.updateBookingStatus(1L, requestBody);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Cập nhật trạng thái thành công!", response.getBody());
        assertEquals("CONFIRMED", mockBooking.getStatus()); // Đảm bảo trạng thái đã bị đổi
    }

    // ==========================================
    // TC07: Xóa đơn hàng thành công
    // ==========================================
    @Test
    public void testDeleteBooking_Success() {
        ResponseEntity<?> response = bookingController.deleteBooking(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Đã xóa đơn hàng thành công!", response.getBody());
        verify(bookingRepository).deleteById(1L); // Đảm bảo hàm xóa trong DB được gọi
    }
}