package TravelBooking.features.ai.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import TravelBooking.features.ai.dto.ForecastChartDTO;
import TravelBooking.features.ai.entity.DemandForecast;
import TravelBooking.features.ai.repository.DemandForecastRepository;

@Service
public class DemandForecastServiceImpl implements DemandForecastService {

    @Autowired
    private DemandForecastRepository forecastRepository;

    @Override
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

    @Override
    public Map<String, Object> runAIPipeline() {
        try {
            // LƯU Ý QUAN TRỌNG: Sửa lại đường dẫn này cho khớp chuẩn với máy của bạn.
            // Dựa vào ảnh Terminal của bạn, tôi thấy đường dẫn là:
            String pythonScriptPath = "D:\\Users\\Admin\\Web-Nang-Cao\\DuDoanDashboard\\train_and_forecast.py";

            // Lệnh này tương đương với việc gõ "python train_and_forecast.py" trong
            // Terminal
            ProcessBuilder processBuilder = new ProcessBuilder("python", pythonScriptPath);
            processBuilder.environment().put("PYTHONIOENCODING", "UTF-8");
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();

            // Đọc log từ Terminal của Python để in ra console của Java (giúp bạn dễ debug)
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("[AI Python Log] " + line);
            }

            int exitCode = process.waitFor(); // Chờ AI chạy xong

            Map<String, Object> responseData = new HashMap<>();
            if (exitCode == 0) {
                responseData.put("status", "success");
                responseData.put("message", "Cập nhật AI thành công!");
            } else {
                responseData.put("status", "error");
                responseData.put("message", "Lỗi khi chạy file Python!");
            }
            return responseData;
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("status", "error");
            responseData.put("message", "Lỗi Server: " + e.getMessage());
            return responseData;
        }
    }
}
