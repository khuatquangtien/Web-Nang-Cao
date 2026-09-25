package TravelBooking.features.user.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import TravelBooking.common.config.JwtTokenProvider;
import TravelBooking.features.user.dto.request.LoginRequest;
import TravelBooking.features.user.dto.request.ResetPasswordRequest;
import TravelBooking.features.user.entity.User;
import TravelBooking.features.user.repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JavaMailSender mailSender;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Override
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

	@Override
	public void resetPassWord(String otp, String email, String newPassword) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Email không tồn tại"));
		if (!otp.equals(user.getOtpCode()) || user.getOtpCode() == null) {
			throw new RuntimeException("Mã OTP sai");
		}
		if (user.getOtpExpiryTime().isBefore(LocalDateTime.now())) {
			throw new RuntimeException("mã OTP đã hết hạn");
		}
		user.setPassword(passwordEncoder.encode(newPassword));
		user.setOtpCode(null);
		user.setOtpExpiryTime(null);
		userRepository.save(user);

	}

	@Override
	// đăng kí
	public Map<String, Object> register(User user) {
		// trùng username
		if (userRepository.existsByUsername(user.getUsername()))
			throw new RuntimeException("Tên Đăng nhập" + user.getUsername() + " đã tồn tại");
		// trùng email
		if (userRepository.existsByEmail(user.getEmail()))
			throw new RuntimeException("Email" + user.getEmail() + " đã tồn tại");

		// mã hoá pass
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		// set role
		if (user.getRole() == null || user.getRole().isEmpty()) {
			user.setRole("USER");
		}
		User savedUser = userRepository.save(user);

		Map<String, Object> response = new HashMap<>();
		response.put("message", "Đăng kí tài khoản thành công");
		response.put("userId", savedUser.getId());
		response.put("username", savedUser.getUsername());
		return response;
	}

	@Override
	// Đăng nhập
	public Map<String, Object> login(LoginRequest request) {
		User user = userRepository.findByUsername(request.getUsername())
				.orElseThrow(() -> new RuntimeException("Tên đăng nhập không chính xác"));

		if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
			throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không chinh xác");

		String token = jwtTokenProvider.generateToken(user.getUsername(), user.getRole());
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Đăng nhập thành công");
		response.put("id", user.getId());
		response.put("email", user.getEmail());
		response.put("username", user.getUsername());
		response.put("role", user.getRole());
		response.put("token", token);
		return response;

	}

	@Override
	public User getUserById(Long id) {

		return userRepository.findById(id).get();
	}

	@Override
	public User updateUser(Long id, User userDetails) {
		Optional<User> user = userRepository.findById(id);
		if (user.isPresent()) {
			User existingUser = user.get();
			existingUser.setFullName(userDetails.getFullName());
			existingUser.setPhone(userDetails.getPhone());
			existingUser.setEmail(userDetails.getEmail());

			userRepository.save(existingUser);
			return existingUser;
		} else {
			throw new RuntimeException("Không tìm thấy user");
		}

	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

}
