package TravelBooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class TravelBooking {

	public static void main(String[] args) {
		SpringApplication.run(TravelBooking.class, args);
        System.out.println("THÀNH CÔNG");

	}
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Cho phép tất cả các đường dẫn
                        .allowedOrigins("http://localhost:3000") // Cho phép FE chạy ở port 3000 gọi vào
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Cho phép các loại lệnh
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

}
