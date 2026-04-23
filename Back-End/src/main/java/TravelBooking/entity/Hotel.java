package TravelBooking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "Hotel")
@Data
public class Hotel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	

	@Column(nullable = false)
	private String name;
	
	@Column(unique = true)
	private String slug;
	
	@Column()
	private String address;
	
	@Column(length = 2000)
	private String description;
	
	@Column(length = 10)
	private String phone_number;
	
	@Column()
	private String email;
	
	@Column()
	private Integer starRating;
	
	@Column() 
	private Double averageRating ;
	
	@Column()
	private Integer review_count;
	
	@Column()
	private String thumbnail_url;
	
	@Column()
	private Long min_price;
	
	@Column()
	private Integer location_id;
	
	@Column()
	private Boolean is_active;
	
	
	
	 
	
}
