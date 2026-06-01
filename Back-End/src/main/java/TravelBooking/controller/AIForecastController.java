package TravelBooking.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.nio.charset.StandardCharsets; // THÊM DÒNG NÀY ĐỂ HỖ TRỢ UTF-8

@RestController
@RequestMapping("/api/ai")
public class AIForecastController {

    @PostMapping("/run-pipeline")
    public ResponseEntity<?> runAIPipeline() {
        try {
            // LƯU Ý QUAN TRỌNG: Sửa lại đường dẫn này cho khớp chuẩn với máy của bạn. 
            // Dựa vào ảnh Terminal của bạn, tôi thấy đường dẫn là:
            String pythonScriptPath = "D:\\Users\\Admin\\Web-Nang-Cao\\DuDoanDashboard\\train_and_forecast.py";
            
            // Lệnh này tương đương với việc gõ "python train_and_forecast.py" trong Terminal
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
            
            if (exitCode == 0) {
                return ResponseEntity.ok().body("{\"message\": \"Cập nhật AI thành công!\"}");
            } else {
                return ResponseEntity.status(500).body("{\"error\": \"Lỗi khi chạy file Python!\"}");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"Lỗi Server: " + e.getMessage() + "\"}");
        }
    }
}
