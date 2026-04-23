package TravelBooking.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import TravelBooking.dto.ResetPasswordRequest;
import TravelBooking.entity.User;
import TravelBooking.repository.UserRepository;

@Service
public class UserService {
	@Autowired UserRepository userRepository;
	
	@Autowired JavaMailSender mailSender;
	
	public void sendOTP(ResetPasswordRequest email) {
		String getEmail = email.getEmail();
		User user = userRepository.findByEmail(getEmail)
					.orElseThrow(() -> new RuntimeException("Email không tồn tại"));
		String otp = String.valueOf(new Random().nextInt(89999) + 10000);
		 
		user.setOtpCode(otp);
		user.setOtpExpiryTime(LocalDateTime.now().plusMinutes(5));
		userRepository.save(user);
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setTo(getEmail);
		message.setSubject("mã xác nhận đổi mật khẩu");
		message.setText("Mã OTP của bạn là: " + otp + " hết hiệu lực trong 5ph");
		mailSender.send(message);
		
		
	}
	public void resetPassWord(String otp, String email, String newPassword) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(()-> new RuntimeException("Email không tồn tại"));
		if(user.getOtpCode().equals(otp) || user.getOtpCode() == null) {
			throw new RuntimeException("Mã OTP sai");
		}
		if(user.getOtpExpiryTime().isBefore(LocalDateTime.now()) ) {
			throw new RuntimeException("mã OTP đã hết hạn");
		}
		user.setPassword(newPassword);
		user.setOtpCode(null);
		user.setOtpExpiryTime(null);
		userRepository.save(user);
		
	}
}
