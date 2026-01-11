package TravelBooking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*") // Cho phép React gọi thoải mái (tạm thời)
public class TestController {

    @GetMapping
    public String hello() {
        return "Kết nối thành công! Backend đang chạy.";
    }
}