package TravelBooking.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Liên kết với bảng User ---
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // --- Liên kết với bảng Tour ---
    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate bookingDate;
    
    @Min(value = 1, message = "Số người phải ít nhất là 1")
    private Integer numPeople;

    private String status;
    
    private Double totalPrice;

    // 👇 --- THÊM 2 DÒNG NÀY (Để lưu thông tin nhập từ Form) --- 👇
    
    @Column(name = "customer_name")
    private String customerName; // Lưu "Họ tên" khách nhập

    @Column(name = "customer_phone")
    private String customerPhone; // Lưu "SĐT" khách nhập (Dùng String để giữ số 0 đầu)


    // --- Constructor ---
    public Booking() {}

    // Cập nhật Constructor (nếu bạn có dùng constructor này ở đâu đó)
    public Booking(User user, Tour tour, Integer numPeople, LocalDate bookingDate, String customerName, String customerPhone) {
        this.user = user;
        this.tour = tour;
        this.numPeople = numPeople;
        this.bookingDate = bookingDate;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.status = "PENDING";
    }

    // --- Getters & Setters (Bắt buộc phải thêm cho 2 trường mới) ---
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Tour getTour() { return tour; }
    public void setTour(Tour tour) { this.tour = tour; }

    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }

    public Integer getNumPeople() { return numPeople; }
    public void setNumPeople(Integer numPeople) { this.numPeople = numPeople; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    // 👇 --- GETTER SETTER MỚI --- 👇
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
}