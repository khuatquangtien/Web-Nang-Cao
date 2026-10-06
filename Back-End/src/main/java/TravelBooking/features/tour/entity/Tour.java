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

    private String city; 
    private String address;
    private String distance;
    private String image;

    // 
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