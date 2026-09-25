package TravelBooking.features.tour.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tours")
@Data
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Double price;

    private String city; // Chúng ta dùng city thay cho destination
    private String address;
    private String distance;
    private String image;

    // 👇 SỬA LỖI SQL: Đổi tên 'desc' thành 'description' (vì desc là từ khóa cấm
    // của SQL)
    @Column(length = 2000)
    private String description;
    private Double averageRating;
    private Integer maxGroupSize;
    private Boolean featured;

    // --- Constructor ---
    public Tour() {
    }

    // --- Getters and Setters ---

}