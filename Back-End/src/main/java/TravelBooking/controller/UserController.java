package TravelBooking.controller; // Đảm bảo đúng tên package của bạn

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.dto.LoginRequest;
import TravelBooking.dto.LoginResponse;
import TravelBooking.entity.User;
import TravelBooking.repository.UserRepository;

@RestController // Đánh dấu đây là nơi tiếp nhận API
@RequestMapping("/users") // Tất cả các đường dẫn sẽ bắt đầu bằng /users
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 1. API lấy danh sách 	tất cả user
    // Đường dẫn: GET http://localhost:8080/users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2. API tạo mới một user
    // Đường dẫn: POST http://localhost:8080/users
    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody User user){
    	if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Tên đăng nhập này đã tồn tại!");
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
                    user.getId()
                );
                
                return ResponseEntity.ok(response);
            }
        }

        // Nếu sai
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Sai tên đăng nhập hoặc mật khẩu!");
    }
}