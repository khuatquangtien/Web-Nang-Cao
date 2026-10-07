package TravelBooking.features.Transport.mapper;

import org.springframework.stereotype.Component;

import TravelBooking.features.Transport.dto.response.TransportResponse;
import TravelBooking.features.Transport.entity.Transport;

@Component
public class TransportMapper {

    public TransportResponse mapToResponse(Transport transport) {
        if (transport == null)
            return null;

        return TransportResponse.builder()
                .id(transport.getId())
                .transportType(transport.getTransportType())
                .transportName(transport.getTransportName())
                .code(transport.getCode())
                .brand(transport.getBrand())
                .price(transport.getPrice())
                .departureLocation(transport.getDepartureLocation())
                .imageUrl(transport.getImageUrl())
                .status(transport.getStatus())
                .build();
    }
}
