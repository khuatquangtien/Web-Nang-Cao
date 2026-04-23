package TravelBooking.entity;

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

    private String city;        // Chúng ta dùng city thay cho destination
    private String address;
    private String distance;
    private String image;
    
    // 👇 SỬA LỖI SQL: Đổi tên 'desc' thành 'description' (vì desc là từ khóa cấm của SQL)
    @Column(length = 2000)
    private String description; 
    private Double averageRating;
    private Integer maxGroupSize;
    private Boolean featured;   
    
    // --- Constructor ---
    public Tour() {}

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getDistance() { return distance; }
    public void setDistance(String distance) { this.distance = distance; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    // 👇 Nhớ sửa Getter/Setter cho đúng tên mới
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Integer getMaxGroupSize() { return maxGroupSize; }
    public void setMaxGroupSize(Integer maxGroupSize) { this.maxGroupSize = maxGroupSize; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }
}