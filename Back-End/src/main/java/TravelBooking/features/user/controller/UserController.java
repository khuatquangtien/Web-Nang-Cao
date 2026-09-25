package TravelBooking.features.user.controller; // Đảm bảo đúng tên package của bạn

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.features.user.dto.request.LoginRequest;
import TravelBooking.features.user.dto.request.ResetPasswordRequest;
import TravelBooking.features.user.entity.User;
import TravelBooking.features.user.service.UserService;

@RestController // Đánh dấu đây là nơi tiếp nhận API
@RequestMapping("/users") // Tất cả các đường dẫn sẽ bắt đầu bằng /users
// @CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // 1. API lấy danh sách tất cả user
    // Đường dẫn: GET http://localhost:9090/users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 2. API tạo mới một user/ đăng kí tại khoản
    // Đường dẫn: POST http://localhost:9090/users
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Map<String, Object> result = userService.register(user);
        return ResponseEntity.ok(result);
    }

    // API Đăng nhập
    // POST: http://localhost:9090/users/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> result = userService.login(loginRequest);
        return ResponseEntity.ok(result);
    }

    // Quên Mật khẩu
    @PostMapping("/forgetPass")
    public ResponseEntity<?> requestOTPPass(@RequestBody ResetPasswordRequest email) {
        userService.sendOTP(email);
        return ResponseEntity.ok("đã gửi mã OTP");

    }

    // Reset mật khẩu
    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.resetPassWord(request.getOtp(), request.getEmail(), request.getNewPassword());
        return ResponseEntity.ok("Da doi mat khau");

    }

    // lấy tài kho;ản theo id
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    //
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        // Tìm người dùng trong DB
        User user = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(user);
    }

}