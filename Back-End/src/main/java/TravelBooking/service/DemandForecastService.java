package TravelBooking.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TravelBooking.dto.ForecastChartDTO;
import TravelBooking.entity.DemandForecast;
import TravelBooking.repository.DemandForecastRepository;

@Service
public class DemandForecastService {

    @Autowired
    private DemandForecastRepository forecastRepository;

    public ForecastChartDTO getChartDataByTour(Long tourId) {
        // 1. Lấy danh sách dự báo của Tour được sắp xếp theo thời gian tăng dần
        List<DemandForecast> forecasts = forecastRepository.findByTourIdOrderByForecastMonthAsc(tourId);

        List<String> labels = new ArrayList<>();
        List<Integer> predictedData = new ArrayList<>();
        List<Integer> actualData = new ArrayList<>();

        // Định dạng hiển thị tháng/năm trên biểu đồ (VD: 06/2026)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yyyy");

        // 2. Duyệt qua dữ liệu để bóc tách bỏ vào DTO
        for (DemandForecast f : forecasts) {
            labels.add(f.getForecastMonth().format(formatter));
            predictedData.add(f.getPredictedPassengers());
            actualData.add(f.getActualPassengers());
        }
        ForecastChartDTO dto = new ForecastChartDTO(labels, predictedData, actualData);

        // 4. LẤY CHỈ SỐ AI TỪ DATABASE GẮN VÀO DTO
        // Vì tất cả các tháng của 1 Tour đều có chung 1 chỉ số MAE và R2, 
        // ta chỉ cần lấy từ phần tử đầu tiên (index 0) là đủ.
        if (!forecasts.isEmpty()) {
            dto.setMae(forecasts.get(0).getMae());
            dto.setR2Score(forecasts.get(0).getR2Score());
        }

        return dto;
    }
}