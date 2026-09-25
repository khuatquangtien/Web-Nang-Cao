package TravelBooking.features.user.service;

import java.util.List;
import java.util.Map;

import TravelBooking.features.user.dto.request.LoginRequest;
import TravelBooking.features.user.dto.request.ResetPasswordRequest;
import TravelBooking.features.user.entity.User;

public interface UserService {

    public void sendOTP(ResetPasswordRequest email);

    public void resetPassWord(String otp, String email, String newPassword);

    // đăng kí
    public Map<String, Object> register(User user);

    // Đăng nhập
    public Map<String, Object> login(LoginRequest request);

    public List<User> getAllUsers();

    public User getUserById(Long id);

    public User updateUser(Long id, User userDetails);

}
