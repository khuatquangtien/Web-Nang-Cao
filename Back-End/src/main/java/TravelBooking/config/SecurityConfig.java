package TravelBooking.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults()) // Bật CORS và dùng cấu hình bên dưới
            .csrf(csrf -> csrf.disable())    // Tắt CSRF
            .authorizeHttpRequests(auth -> auth
            		.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            	    .requestMatchers("/users/**").permitAll()
//            	    .requestMatchers(HttpMethod.GET, "/tours/search/getFeaturedTours").permitAll()
            	    .requestMatchers("/tours/**").permitAll()
            	    .requestMatchers("/bookings/**").permitAll()
            	    .requestMatchers("/search" , "/search/**").permitAll()
            	    .requestMatchers("/review" , "/review/**").permitAll()
            	    .anyRequest().authenticated()
            );
            
        return http.build();
    }

    // Cấu hình CORS trực tiếp cho Spring Security
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 1. Chỉ giữ lại danh sách các nguồn cụ thể này
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",   // Cho Web React
            "http://192.168.1.3:3000", // IP máy của bạn
            "http://10.0.2.2:3000"     // Cho Emulator
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