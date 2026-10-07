package TravelBooking.features.Transport.dto.response;

import TravelBooking.features.Transport.enums.TransportStatus;
import TravelBooking.features.Transport.enums.TransportType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransportResponse {

    private Long id;
    private TransportType transportType;
    private String transportName;
    private String code;
    private String brand;
    private Long price;
    private String departureLocation;
    private String imageUrl;
    private TransportStatus status;

}
