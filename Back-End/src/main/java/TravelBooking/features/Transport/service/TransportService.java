package TravelBooking.features.Transport.service;

import java.util.List;

import TravelBooking.features.Transport.dto.response.TransportResponse;

public interface TransportService {

    List<TransportResponse> getAllTransport();

    TransportResponse getTransportById(Long id);

}
