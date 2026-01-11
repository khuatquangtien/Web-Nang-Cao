package TravelBooking.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tours")
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title; // Tên tour (Vd: Du lịch Hạ Long)

    @Column(length = 1000) // Cho phép mô tả dài
    private String description;

    @Column(nullable = false)
    private Double price; // Giá tiền

    private String destination; // Địa điểm

    // --- Constructor mặc định ---
    public Tour() {
    }

    // --- Constructor có tham số ---
    public Tour(String title, String description, Double price, String destination) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.destination = destination;
    }

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    
   
}