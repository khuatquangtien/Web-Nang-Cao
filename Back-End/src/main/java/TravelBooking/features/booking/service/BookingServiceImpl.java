package TravelBooking.features.booking.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.swing.text.html.parser.Entity;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import TravelBooking.common.notification.EmailHotelService;
import TravelBooking.common.notification.EmailService;
import TravelBooking.features.booking.dto.request.BookingHotelRequest;
import TravelBooking.features.booking.dto.request.BookingTourRequest;
import TravelBooking.features.booking.dto.request.UpdateBooKingRequest;
import TravelBooking.features.booking.dto.response.BookingResponse;
import TravelBooking.features.booking.entity.Booking;
import TravelBooking.features.booking.entity.BookingStatus;
import TravelBooking.features.booking.repository.BookingRepository;
import TravelBooking.features.hotel.entity.Hotel;
import TravelBooking.features.hotel.repository.HotelRepository;
import TravelBooking.features.tour.entity.Tour;
import TravelBooking.features.tour.repository.TourRepository;
import TravelBooking.features.user.entity.User;
import TravelBooking.features.user.repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailHotelService emailHotelService;

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    @Override
    public List<BookingResponse> findByUserId(Long userId) {
        return bookingRepository.findByUserId(userId).stream().map(this::mapToResponse).toList();
    }

    @Override
    public BookingResponse findByBookingId(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với id: " + id));
        return mapToResponse(booking);
    }

    @Override
    public List<BookingResponse> getMyBookings(String username) {
        return bookingRepository.findByUser_Username(username).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    @Override
    public ResponseEntity updateBookingStatus(Long id, UpdateBooKingRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        BookingStatus newStatus = request.getStatus();

        if (newStatus != null) {
            booking.setStatus(newStatus);
            bookingRepository.save(booking);
            return ResponseEntity.ok("Cập nhật trạng thái thành công ");
        } else {
            return ResponseEntity.badRequest().body("Thiếu trạng thái");
        }

    }

    @Transactional
    @Override
    public void deleteBooking(Long id) {
        try {
            bookingRepository.deleteById(id);

        } catch (Exception ex) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xoá");

        }

    }

    @Transactional
    @Override
    public ResponseEntity<String> confirmBookingEmail(Long Id) {
        try {
            Optional<Booking> bookingOtp = bookingRepository.findById(Id);
            if (bookingOtp.isPresent()) {
                Booking booking = bookingOtp.get();
                BookingStatus status = booking.getStatus();

                if (BookingStatus.PENDING.equals(status)) {
                    booking.setStatus(BookingStatus.CONFIRMED);
                    bookingRepository.save(booking);

                    String htmlResponse = "<html><body style='text-align:center; padding:50px; font-family:Arial;'>"
                            + "<div style='max-width:500px; margin:0 auto; background:#fff; padding:30px; border-radius:10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);'>"
                            + "<h2 style='color:#28a745;'>🎉 Xác nhận đặt tour thành công!</h2>"
                            + "<p>Cảm ơn bạn. Chuyến đi của bạn đã được hệ thống ghi nhận thành công.</p>"
                            + "<a href='http://localhost:3000' style='display:inline-block; margin-top:20px; padding:10px 20px; background:#faa935; color:white; text-decoration:none; border-radius:5px;'>Quay lại trang chủ</a>"
                            + "</div></body></html>";

                    return ResponseEntity.ok().body(htmlResponse);

                } else {
                    return ResponseEntity.ok("<html><body style='text-align:center; padding:50px; font-family:Arial;'>"
                            + "<h2>Đơn đặt tour này đã được xác nhận hoặc đã hủy trước đó!</h2>"
                            + "<p>Trạng thái hiện tại: <b>" + status + "</b></p>"
                            + "</body></html>");
                }

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy đơn đặt tour!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi hệ thống: " + e.getMessage());
        }

    }

    // Đặt tour
    @Transactional
    @Override
    public Map<String, Object> createBooking(BookingTourRequest booking, String username) {

        Booking bookingResult = new Booking();
        if (booking.getTourId() == null) {
            throw new RuntimeException("Lỗi : phải chọn tour hợp lệ");
        }

        Tour tour = tourRepository.findById(booking.getTourId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Tour với ID này!"));
        bookingResult.setTour(tour);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Người dùng chưa đăng nhập!"));
        bookingResult.setUser(user);

        bookingResult.setNumPeople(booking.getNumPeople());
        bookingResult.setBookingDate(booking.getBookingDate());
        bookingResult.setCustomerName(booking.getCustomerName());
        bookingResult.setCustomerPhone(booking.getCustomerPhone());
        bookingResult.setNote(booking.getNote());
        bookingResult.setTotalPrice(tour.getPrice() * booking.getNumPeople());
        bookingResult.setStatus(BookingStatus.PENDING);

        Booking savedBooking = bookingRepository.save(bookingResult);

        try {
            if (savedBooking.getUser() != null && savedBooking.getUser().getEmail() != null) {
                emailService.sendHtmlEmail(
                        savedBooking.getUser().getEmail(),
                        "Xác nhận đơn đặt tour " + savedBooking.getId(),
                        savedBooking.getUser().getUsername(),
                        savedBooking.getTour().getTitle(),
                        savedBooking.getBookingDate().toString(),
                        savedBooking.getNumPeople(),
                        savedBooking.getTotalPrice(),
                        savedBooking.getId());
            }
        } catch (Exception e) {
            System.err.println("Lỗi gửi mail xác nhận booking: " + e.getMessage());
        }
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("message", "Đặt tour thành công");
        responseData.put("bookingId", savedBooking.getId());

        return responseData;

    }

    @Transactional
    @Override
    public Map<String, Object> bookHotel(BookingHotelRequest request) {
        Optional<Hotel> hotelOpt = hotelRepository.findById(request.getHotelId());
        String hotelName = "khách sạn không có trong hệ thống";
        if (hotelOpt.isPresent()) {
            hotelName = hotelOpt.get().getName();
        }
        try {
            emailHotelService.sendHotelBookingConfirmation(
                    request.getCustomerEmail(),
                    request.getCustomerName(),
                    hotelName,
                    request.getCheckInDate());
        } catch (Exception e) {
            // TODO: handle exception
            System.err.println("❌ Lỗi khi gửi mail: " + e.getMessage());

        }
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Đặt phòng thành công! Bản sao xác nhân đã được gửi qua gmail của bạn");
        return response;
    }

    @Transactional
    @Override
    public Map<String, Object> receivePaymentWebhook(Map<String, Object> payload) {
        try {
            // 1. In toàn bộ dữ liệu ra màn hình đen (Console) để dễ debug
            System.out.println("========== CÓ BIẾN ĐỘNG SỐ DƯ ==========");
            System.out.println("Dữ liệu nhận được: " + payload);

            // 2. Lấy nội dung chuyển khoản ra từ payload
            // LƯU Ý: Chữ "description" có thể đổi thành "content" hoặc "memo" tùy vào bên
            // thứ 3 bạn dùng
            String description = String.valueOf(payload.get("content"));

            // 3. Bóc tách ID đơn đặt tour từ nội dung chuyển khoản
            Long bookingId = extractBookingIdFromDescription(description);

            if (bookingId != null) {
                // 4. Tìm đơn hàng trong cơ sở dữ liệu
                Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);

                if (bookingOpt.isPresent()) {
                    Booking booking = bookingOpt.get();

                    // 5. Cập nhật trạng thái thành ĐÃ THANH TOÁN (PAID)
                    booking.setStatus(BookingStatus.PAID);
                    bookingRepository.save(booking);

                    System.out.println(">>> Đã cập nhật thành công trạng thái thanh toán cho Booking ID: " + bookingId);
                    System.out.println("=========================================");

                    // Bắt buộc phải trả về mã 200 OK để báo cho bên thứ 3 biết bạn đã nhận tin
                    // thành công
                    Map<String, Object> result = new HashMap<>();
                    result.put("status", "success");
                    return result;
                } else {
                    System.out.println(">>> KHÔNG TÌM THẤY ĐƠN HÀNG MÃ SỐ: " + bookingId);
                }
            }

            Map<String, Object> result = new HashMap<>();
            result.put("status", "success");
            return result;

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> result = new HashMap<>();
            result.put("status", "error");
            return result;
        }
    }

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

    private BookingResponse mapToResponse(Booking booking) {
        BookingResponse res = new BookingResponse();
        res.setId(booking.getId());
        if (booking.getTour() != null) {
            res.setTourId(booking.getTour().getId());
            res.setTourTitle(booking.getTour().getTitle());
            res.setTourImage(booking.getTour().getImage()); // hoặc imageUrl tùy trường trong Tour
        }
        res.setBookingDate(booking.getBookingDate());
        res.setNumPeople(booking.getNumPeople());
        res.setTotalPrice(booking.getTotalPrice());
        res.setStatus(booking.getStatus());
        res.setCustomerName(booking.getCustomerName());
        res.setCustomerPhone(booking.getCustomerPhone());
        res.setNote(booking.getNote());
        return res;
    }

}
