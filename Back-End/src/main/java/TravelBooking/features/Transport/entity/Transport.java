package TravelBooking.features.Transport.entity;

import TravelBooking.features.Transport.enums.TransportStatus;
import TravelBooking.features.Transport.enums.TransportType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TransportType transportType;

    @Column(name = "transport_name")
    private String transportName;

    @Column(name = "code")
    private String code;

    @Column(name = "brand")
    private String brand;
    @Column(name = "price")
    private Long price;

    @Column(name = "departure_location")
    private String departureLocation;

    @Column(name = "image_Url")
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private TransportStatus status;

}
