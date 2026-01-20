package TravelBooking.service; // 👈 Đảm bảo dòng này giống tên package của bạn

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    // Hàm gửi email HTML
    public void sendHtmlEmail(String to, String subject, String name, String tourName, String date, int guestSize, double price) {
        try {
            // 1. Tạo Context để truyền dữ liệu vào file HTML
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("tourName", tourName);
            context.setVariable("bookingDate", date);
            context.setVariable("guestSize", guestSize);
            context.setVariable("price", price);

            // 2. Nạp file HTML template (tên file là booking-confirmation.html)
            String htmlContent = templateEngine.process("booking-confirmation", context);

            // 3. Tạo mail
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true = gửi dưới dạng HTML
            
            // 👇 Thay email này bằng email bạn đã cấu hình trong application.properties
            helper.setFrom("TravelApp <khuattien05@gmail.com>");

            // 4. Gửi
            mailSender.send(message);
            System.out.println("Mail sent to: " + to);

        } catch (MessagingException e) {
            System.err.println("Lỗi gửi mail: " + e.getMessage());
        }
    }
}