package TravelBooking.features.Transport.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.common.dto.response.ApiResponse;
import TravelBooking.features.Transport.dto.response.TransportResponse;
import TravelBooking.features.Transport.service.TransportService;

@RestController
@RequestMapping("/transport")
public class TransportController {

    @Autowired
    private TransportService transportService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransportResponse>>> getAllTransport() {
        List<TransportResponse> list = transportService.getAllTransport();
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách thành công", list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TransportResponse>> getTransportById(@PathVariable Long id) {
        TransportResponse transport = transportService.getTransportById(id);
        return ResponseEntity.ok(ApiResponse.success("Lấy chi tiết thành công", transport));
    }
}
