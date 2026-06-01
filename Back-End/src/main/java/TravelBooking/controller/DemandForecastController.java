package TravelBooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.dto.ForecastChartDTO;
import TravelBooking.service.DemandForecastService;

@RestController
@RequestMapping("/api/admin/forecast")
public class DemandForecastController {

    @Autowired
    private DemandForecastService forecastService;

    // API lấy dữ liệu biểu đồ dự báo theo mã Tour
    // Ví dụ gọi đường dẫn: GET http://localhost:9090/api/admin/forecast/1
    @GetMapping("/{tourId}")
    public ResponseEntity<ForecastChartDTO> getTourForecastChart(@PathVariable Long tourId) {
        ForecastChartDTO chartData = forecastService.getChartDataByTour(tourId);
        return ResponseEntity.ok(chartData);
    }
}