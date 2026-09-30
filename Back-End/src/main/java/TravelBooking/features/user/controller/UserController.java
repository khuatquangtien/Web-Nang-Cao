package TravelBooking.features.user.controller; // Đảm bảo đúng tên package của bạn

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.common.dto.ApiResponse;
import TravelBooking.features.user.dto.request.LoginRequest;
import TravelBooking.features.user.dto.request.RegisterRequest;
import TravelBooking.features.user.dto.request.ResetPasswordRequest;
import TravelBooking.features.user.dto.request.UpdateUserRequest;
import TravelBooking.features.user.dto.response.LoginResponse;
import TravelBooking.features.user.dto.response.UserResponse;
import TravelBooking.features.user.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 1. API lấy danh sách tất cả user
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.success(userService.getAllUsers()));
    }

    // 2. API tạo mới một user / đăng ký tài khoản
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@RequestBody RegisterRequest request) {
        UserResponse result = userService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Đăng ký tài khoản thành công", result));
    }

    // 3. API Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse result = userService.login(loginRequest);
        return ResponseEntity.ok(ApiResponse.success("Đăng nhập thành công", result));
    }

    // 4. Quên Mật khẩu
    @PostMapping("/forgetPass")
    public ResponseEntity<ApiResponse<Void>> requestOTPPass(@RequestBody ResetPasswordRequest email) {
        userService.sendOTP(email);
        return ResponseEntity.ok(ApiResponse.success("Đã gửi mã OTP đến email của bạn", null));
    }

    // 5. Reset mật khẩu
    @PostMapping("/resetPassword")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.resetPassWord(request.getOtp(), request.getEmail(), request.getNewPassword());
        return ResponseEntity.ok(ApiResponse.success("Đổi mật khẩu thành công", null));
    }

    // 6. Lấy thông tin user theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    // 7. Cập nhật thông tin user
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest userDetails) {
        UserResponse user = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật thông tin thành công", user));
    }

}