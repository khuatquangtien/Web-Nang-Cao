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
import TravelBooking.features.booking.dto.request.UpdateBooKingRequest;
import TravelBooking.features.booking.entity.Booking;
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
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> findByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public Booking findByBookingId(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tour này"));
    }

    @Transactional
    @Override
    public ResponseEntity updateBookingStatus(Long id, UpdateBooKingRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        String newStatus = request.getStatus();

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
                String status = booking.getStatus();

                if ("Pending".equalsIgnoreCase(status) || "Đang chờ".equalsIgnoreCase(status)) {
                    booking.setStatus("CONFIRMED");
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
    public Map<String, Object> createBooking(Booking booking) {

        if (booking.getTour() == null || booking.getTour().getId() == null) {
            throw new RuntimeException("Lỗi : phải chọn tour hợp lệ");
        }
        if (booking.getUser() == null || booking.getUser().getId() == null) {
            throw new RuntimeException("Lỗi : phải có user");
        }

        Tour tour = tourRepository.findById(booking.getTour().getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Tour với ID này!"));
        booking.setTour(tour);

        User user = userRepository.findById(booking.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy User với ID này!"));
        booking.setUser(user);

        Booking savedBooking = bookingRepository.save(booking);

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
                    booking.setStatus("PAID");
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

}
