package TravelBooking.entity;


import jakarta.persistence.*;

@Entity // Đánh dấu đây là một bảng trong Database
@Table(name = "users") // Đặt tên bảng trong SQL là "users"
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tăng ID (Auto Increment)
    private Long id;

    @Column(nullable = false, unique = true) // Không được để trống, không trùng lặp
    private String username;

    @Column(nullable = false)
    private String password;

    private String email;

    private String fullName;

    // --- Constructor không tham số (Bắt buộc cho JPA) ---
    public User() {
    }

    // --- Constructor có tham số (Để tiện tạo mới) ---
    public User(String username, String password, String email, String fullName) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
    }

    // --- Getter và Setter (Bắt buộc để truy xuất dữ liệu) ---
    // (Bạn có thể dùng Lombok @Data để rút gọn, nhưng ở đây mình viết rõ để bạn dễ hiểu)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
}
