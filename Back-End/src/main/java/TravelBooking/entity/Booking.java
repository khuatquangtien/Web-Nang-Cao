package TravelBooking.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

import java.time.LocalDate; // Nhớ import cái này để dùng ngày tháng

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Liên kết với bảng User ---
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Ai đặt?

    // --- Liên kết với bảng Tour ---
    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour; // Đặt tour nào?

    private LocalDate bookingDate; // Ngày đặt (YYYY-MM-DD)
    
    @Min(value = 1, message = "Số người phải ít nhất là 1") // Phải >= 1
    private Integer numPeople; // Số lượng người đi

    private String status; // Trạng thái (PENDING, CONFIRMED)
    
    private Double totalPrice; // Thêm dòng này: Tổng tiền đơn hàng


    // --- Constructor ---
    public Booking() {}

    public Booking(User user, Tour tour, Integer numPeople, LocalDate bookingDate) {
        this.user = user;
        this.tour = tour;
        this.numPeople = numPeople;
        this.bookingDate = bookingDate;
        this.status = "PENDING"; // Mặc định là Chờ xử lý
    }

    // --- Getters & Setters ---
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
}