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
	public TravelBooking.features.user.dto.response.UserResponse register(TravelBooking.features.user.dto.request.RegisterRequest request) {
		// trùng username
		if (userRepository.existsByUsername(request.getUsername()))
			throw new RuntimeException("Tên Đăng nhập " + request.getUsername() + " đã tồn tại");
		// trùng email
		if (userRepository.existsByEmail(request.getEmail()))
			throw new RuntimeException("Email " + request.getEmail() + " đã tồn tại");

		User user = new User();
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		user.setFullName(request.getFullName());
		user.setPhone(request.getPhone());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole("USER");

		User savedUser = userRepository.save(user);
		return TravelBooking.features.user.dto.response.UserResponse.fromEntity(savedUser);
	}

	@Override
	// Đăng nhập
	public TravelBooking.features.user.dto.response.LoginResponse login(LoginRequest request) {
		User user = userRepository.findByUsername(request.getUsername())
				.orElseThrow(() -> new RuntimeException("Tên đăng nhập hoặc mật khẩu không chính xác"));

		if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
			throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không chính xác");

		String token = jwtTokenProvider.generateToken(user.getUsername(), user.getRole());
		return TravelBooking.features.user.dto.response.LoginResponse.builder()
				.token(token)
				.id(user.getId())
				.username(user.getUsername())
				.email(user.getEmail())
				.role(user.getRole())
				.message("Đăng nhập thành công")
				.build();
	}

	@Override
	public TravelBooking.features.user.dto.response.UserResponse getUserById(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy user với id: " + id));
		return TravelBooking.features.user.dto.response.UserResponse.fromEntity(user);
	}

	@Override
	public TravelBooking.features.user.dto.response.UserResponse updateUser(Long id, TravelBooking.features.user.dto.request.UpdateUserRequest userDetails) {
		User existingUser = userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy user với id: " + id));

		existingUser.setFullName(userDetails.getFullName());
		existingUser.setPhone(userDetails.getPhone());
		existingUser.setEmail(userDetails.getEmail());

		User updatedUser = userRepository.save(existingUser);
		return TravelBooking.features.user.dto.response.UserResponse.fromEntity(updatedUser);
	}

	@Override
	public List<TravelBooking.features.user.dto.response.UserResponse> getAllUsers() {
		return userRepository.findAll().stream()
				.map(TravelBooking.features.user.dto.response.UserResponse::fromEntity)
				.toList();
	}

}
