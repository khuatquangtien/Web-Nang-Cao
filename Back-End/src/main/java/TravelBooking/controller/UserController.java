package TravelBooking.controller; // Đảm bảo đúng tên package của bạn

import TravelBooking.entity.User;
import TravelBooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController // Đánh dấu đây là nơi tiếp nhận API
@RequestMapping("/users") // Tất cả các đường dẫn sẽ bắt đầu bằng /users
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 1. API lấy danh sách tất cả user
    // Đường dẫn: GET http://localhost:8080/users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2. API tạo mới một user
    // Đường dẫn: POST http://localhost:8080/users
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
 // API Đăng nhập
    // POST: http://localhost:9090/users/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        // 1. Tìm user trong DB dựa theo username gửi lên
        Optional<User> userOptional = userRepository.findByUsername(loginData.getUsername());

        // 2. Nếu tìm thấy User
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // 3. So sánh password (Lưu ý: Thực tế sẽ cần mã hóa, ở đây ta so sánh thô để học logic)
            if (user.getPassword().equals(loginData.getPassword())) {
                return ResponseEntity.ok(user); // Trả về thông tin User nếu đúng
            }
        }

        // 4. Nếu sai username hoặc password
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai tên đăng nhập hoặc mật khẩu!");
    }
}