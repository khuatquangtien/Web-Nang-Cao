package TravelBooking.controller; // Đảm bảo đúng tên package của bạn

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.AotInitializerNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.dto.LoginRequest;
import TravelBooking.dto.LoginResponse;
import TravelBooking.dto.ResetPasswordRequest;
import TravelBooking.entity.User;
import TravelBooking.repository.UserRepository;
import TravelBooking.service.EmailService;
import TravelBooking.service.UserService;

@RestController // Đánh dấu đây là nơi tiếp nhận API
@RequestMapping("/users") // Tất cả các đường dẫn sẽ bắt đầu bằng /users
//@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired 
    private UserService userService;
    
    // 1. API lấy danh sách 	tất cả user
    // Đường dẫn: GET http://localhost:9090/users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2. API tạo mới một user/ đăng kí tại khoản
    // Đường dẫn: POST http://localhost:9090/users
    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody User user){
    	if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Tên đăng nhập này đã tồn tại!");
       }
    	if(userRepository.existsByEmail(user.getEmail())) {
    		return ResponseEntity.badRequest().body("Email đã được đăng kí");
    	}
    	User newUser = userRepository.save(user);
    	return ResponseEntity.ok(newUser);
    }
 // API Đăng nhập
    // POST: http://localhost:9090/users/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Tìm user theo username từ DTO gửi lên
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        // Nếu tìm thấy user
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // So sánh password (User trong DB vs Request gửi lên)
            if (user.getPassword().equals(loginRequest.getPassword())) {
                
                // Tạo đối tượng Response chuẩn chỉnh
                LoginResponse response = new LoginResponse(
                    "fake-jwt-token-vip-pro", // Token giả (sau này cài JWT thật vào đây)
                    user.getUsername(),
                    "Đăng nhập thành công!",
                    user.getId(),
                    user.getRole()
                );
                
                return ResponseEntity.ok(response);
            }
        }

        // Nếu sai
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Sai tên đăng nhập hoặc mật khẩu!");
    }
    // Quên Mật khẩu
    @PostMapping("/forgetPass")
    public  ResponseEntity<?> requestOTPPass(@RequestBody ResetPasswordRequest email){
    	try {
			userService.sendOTP(email);
			return ResponseEntity.ok("đã gửi mã OTP");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
    	 
    }
    // Reset mật khẩu
    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request){    	
    	try {
    		userService.resetPassWord(request.getOtp(), request.getEmail(), request.getNewPassword());
    		return ResponseEntity.ok("Da doi mat khau");
    	}
    	catch(Exception e){
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    	}
    }

	public EmailService getEmailService() {
		return emailService;
	}

	public void setEmailService(EmailService emailService) {
		this.emailService = emailService;
	}
    
    // lấy tài kho;ản theo id
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id){
		Optional<User> user = userRepository.findById(id);
        
        // Nếu có thì trả về dữ liệu, không thì báo lỗi 404
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
	}
	// 
	@PutMapping("/update/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
	    // Tìm người dùng trong DB
	    User user = userRepository.findById(id)
	            .orElseThrow(() -> new AotInitializerNotFoundException(null, "User not found"));

	    // Cập nhật các trường thông tin
	    user.setFullName(userDetails.getFullName());
	    user.setPhone(userDetails.getPhone());
	    user.setEmail(userDetails.getEmail());
	    // user.setAvatar(...); // Nếu có ảnh

	    User updatedUser = userRepository.save(user);
	    return ResponseEntity.ok(updatedUser);
	}
    
    
    
    
}