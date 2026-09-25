package TravelBooking.common.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // 👈 Import thêm dòng này

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Các API công khai (Không cần đăng nhập ai cũng xem được)
                        .requestMatchers("/users/**").permitAll()
                        .requestMatchers("/tours/**").permitAll()
                        .requestMatchers("/hotels/**", "/featuresHotels").permitAll()
                        .requestMatchers("/search/**").permitAll()
                        .requestMatchers("/review/**").permitAll()
                        .requestMatchers("/bookings/tour/confirm/**").permitAll()
                        .requestMatchers("/api/payment/webhook").permitAll()
                        .requestMatchers("/api/admin/forecast/**", "/api/ai/**").permitAll()
                        // 👇 CÁC API BẮT BUỘC ĐĂNG NHẬP (Phải có Token mới được gọi)
                        .requestMatchers("/bookings/**").authenticated()
                        // Mọi request còn lại
                        .anyRequest().authenticated())
                // 👇 2. Đặt JwtFilter chạy trước UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    // Cấu hình CORS trực tiếp cho Spring Security
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 1. Chỉ giữ lại danh sách các nguồn cụ thể này
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:9090", // Cho Web React
                "http://192.168.1.8:8081", // IP máy của bạn
                "http://10.0.2.2:8081", // Cho Emulator
                "http://10.23.119.159:8081",
                "http://localhost:3000"

        ));

        // 2. PHẢI XOÁ HOẶC COMMENT DÒNG NÀY (Dòng 49 trong ảnh của bạn)
        // configuration.setAllowedOriginPatterns(Arrays.asList("*"));

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));

        // 3. Vì dòng này là true nên không được có bất kỳ dấu "*" nào ở phần Origins
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}