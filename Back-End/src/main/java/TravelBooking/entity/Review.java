package TravelBooking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Review")
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY	)
	private Long id;
	
	private Long tourid;
	
	@Column(length = 5)
	private Long rating;
	
	private String comment;
	
	private String username;
}
