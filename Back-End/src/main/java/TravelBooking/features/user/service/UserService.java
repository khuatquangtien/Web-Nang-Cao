package TravelBooking.features.user.service;

import java.util.List;
import java.util.Map;

import TravelBooking.features.user.dto.request.LoginRequest;
import TravelBooking.features.user.dto.request.ResetPasswordRequest;
import TravelBooking.features.user.dto.response.UserResponse;
import TravelBooking.features.user.entity.User;

public interface UserService {

    public void sendOTP(ResetPasswordRequest email);

    public void resetPassWord(String otp, String email, String newPassword);

    public UserResponse register(TravelBooking.features.user.dto.request.RegisterRequest request);

    public TravelBooking.features.user.dto.response.LoginResponse login(LoginRequest request);

    public List<TravelBooking.features.user.dto.response.UserResponse> getAllUsers();

    public TravelBooking.features.user.dto.response.UserResponse getUserById(Long id);

    public TravelBooking.features.user.dto.response.UserResponse updateUser(Long id,
            TravelBooking.features.user.dto.request.UpdateUserRequest userDetails);

}
