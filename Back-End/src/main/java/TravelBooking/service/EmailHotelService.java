package TravelBooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class EmailHotelService {
	@Autowired
    private JavaMailSender mailSender;

	public void sendHotelBookingConfirmation(String toEmail, String customerName, String hotelName, String checkInDate) {
	    SimpleMailMessage message = new SimpleMailMessage();
	    message.setFrom("khuattien05@gmail.com"); // Điền Gmail của bạn cài trong application.properties
	    message.setTo(toEmail);
	    message.setSubject("[Xác Nhận] Đặt Phòng Khách Sạn Thành Công - " + hotelName);
	    
	    String content = "Xin chào " + customerName + ",\n\n"
	            + "Cảm ơn bạn đã thực hiện đặt phòng trên ứng dụng của chúng tôi.\n"
	            + "Dưới đây là thông tin chi tiết đơn đặt phòng của bạn:\n"
	            + "-----------------------------------------\n"
	            + "🏨 Tên khách sạn: " + hotelName + "\n"
	            + "📅 Ngày nhận phòng dự kiến: " + checkInDate + "\n"
	            + "-----------------------------------------\n\n"
	            + "Nhân viên chăm sóc khách hàng sẽ liên hệ trực tiếp với bạn qua Số điện thoại trong vòng 15-30 phút để xác nhận lại.\n"
	            + "Chúc bạn có một chuyến đi và kỳ nghỉ tuyệt vời!\n\n"
	            + "Trân trọng,\n"
	            + "Đội ngũ Hỗ trợ Khách hàng.";
	            
	    message.setText(content);
	    mailSender.send(message);
	}
}
