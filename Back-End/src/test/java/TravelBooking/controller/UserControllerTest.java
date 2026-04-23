package TravelBooking.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import TravelBooking.entity.User;
import TravelBooking.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    // ==========================================
    // TC01: Đăng kí tài khoản thành công
    // ==========================================
    @Test
    public void testTC01_DangKyThanhCong() {
        User mockUser = new User();
        mockUser.setUsername("user9092");
        mockUser.setPhone("0399007906");
        mockUser.setEmail("khuatt37@gmail.com");
        mockUser.setFullName("khuất quang tiến");
        mockUser.setPassword("1");

        Mockito.when(userRepository.existsByUsername("user9092")).thenReturn(false);
        // Giả sử có hàm existsByEmail, nếu không có bạn có thể bỏ dòng này
        // Mockito.when(userRepository.existsByEmail("khuatt37@gmail.com")).thenReturn(false);
        Mockito.when(userRepository.save(any(User.class))).thenReturn(mockUser);

        ResponseEntity<?> response = userController.register(mockUser);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(userRepository).save(any(User.class));
    }

    // ==========================================
    // TC02: Đăng kí thất bại do trùng Username
    // ==========================================
    @Test
    public void testTC02_DangKyThatBai_TrungUsername() {
        User existingUser = new User();
        existingUser.setUsername("user9092");
        existingUser.setPhone("0399007906");
        existingUser.setEmail("khuatt37@gmail.com");
        existingUser.setFullName("khuất quang tiến");
        existingUser.setPassword("1");

        Mockito.when(userRepository.existsByUsername("user9092")).thenReturn(true);

        ResponseEntity<?> response = userController.register(existingUser);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verify(userRepository, never()).save(any(User.class));
    }

    // ==========================================
    // TC03: Đăng kí thất bại do trùng Email
    // ==========================================
    @Test
    public void testTC03_DangKyThatBai_TrungEmail() {
        User existingUser = new User();
        existingUser.setUsername("user9092_new"); // Đổi username để chắc chắn lỗi do email
        existingUser.setPhone("0399007906");
        existingUser.setEmail("khuatt37@gmail.com"); 
        existingUser.setFullName("khuất quang tiến");
        existingUser.setPassword("1");

        // Giả lập DB không trùng username nhưng TRÙNG email
        Mockito.when(userRepository.existsByUsername("user9092_new")).thenReturn(false);
        Mockito.when(userRepository.existsByEmail("khuatt37@gmail.com")).thenReturn(true); 

        ResponseEntity<?> response = userController.register(existingUser);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verify(userRepository, never()).save(any(User.class));
    }

    // ==========================================
    // TC04: Đăng kí thất bại do bỏ trống Email
    // ==========================================
    @Test
    public void testTC04_DangKyThatBai_BoTrongThongTin() {
        User user = new User();
        user.setUsername("user9092");
        user.setPhone("0399007906");
        user.setEmail(""); // Cố tình để trống Email
        user.setFullName("khuất quang tiến");
        user.setPassword("1");

        ResponseEntity<?> response = userController.register(user);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Cần điền thông tin vào vị trí còn thiếu", response.getBody());
        verify(userRepository, never()).save(any(User.class));
    }

    // ==========================================
    // TC05: Đăng kí thất bại do Email thiếu ký tự "@"
    // ==========================================
    @Test
    public void testTC05_DangKyThatBai_EmailThieuAcong() {
        User user = new User();
        user.setUsername("user9092");
        user.setPhone("0399007906");
        user.setEmail("hieuhoangtien.com"); // Thiếu @
        user.setFullName("khuất quang tiến");
        user.setPassword("1");

        ResponseEntity<?> response = userController.register(user);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Địa chỉ gmail thiếu @", response.getBody());
        verify(userRepository, never()).save(any(User.class));
    }

    // ==========================================
    // TC06: Đăng kí thất bại do Email thiếu phần miền (domain)
    // ==========================================
    @Test
    public void testTC06_DangKyThatBai_EmailChuaHoanChinh() {
        User user = new User();
        user.setUsername("user9092");
        user.setPhone("0399007906");
        user.setEmail("hieuhoangtien@"); // Thiếu phần sau @
        user.setFullName("khuất quang tiến");
        user.setPassword("1");

        ResponseEntity<?> response = userController.register(user);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Địa chỉ gmail chưa hoàn chỉnh", response.getBody());
        verify(userRepository, never()).save(any(User.class));
    }

    // ==========================================
    // TC07: Đăng kí thất bại do Email chứa ký tự đặc biệt sau "@"
    // ==========================================
    @Test
    public void testTC07_DangKyThatBai_EmailChuaKyTuDacBiet() {
        User user = new User();
        user.setUsername("user9092");
        user.setPhone("0399007906");
        user.setEmail("hieuhoangtien@gmail.co;m"); // Chứa dấu chấm phẩy ";"
        user.setFullName("khuất quang tiến");
        user.setPassword("1");

        ResponseEntity<?> response = userController.register(user);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Phía sau @ không chứa các kí tự đặc biệt", response.getBody());
        verify(userRepository, never()).save(any(User.class));
    }
}