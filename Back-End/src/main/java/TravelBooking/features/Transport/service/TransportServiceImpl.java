package TravelBooking.features.Transport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TravelBooking.features.Transport.dto.response.TransportResponse;
import TravelBooking.features.Transport.entity.Transport;
import TravelBooking.features.Transport.mapper.TransportMapper;
import TravelBooking.features.Transport.repository.TransportRepository;

@Service
public class TransportServiceImpl implements TransportService {

    @Autowired
    private TransportRepository transportRepository;

    @Autowired
    private TransportMapper transportMapper;

    @Override
    public List<TransportResponse> getAllTransport() {
        return transportRepository.findAll()
                .stream()
                .map(transportMapper::mapToResponse)
                .toList();
    }

    @Override
    public TransportResponse getTransportById(Long id) {
        Transport transport = transportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phương tiện với id: " + id));
        return transportMapper.mapToResponse(transport);
    }

}
