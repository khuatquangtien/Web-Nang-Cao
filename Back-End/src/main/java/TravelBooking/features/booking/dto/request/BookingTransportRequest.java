package TravelBooking.features.booking.dto.request;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.validator.constraints.Length;

import TravelBooking.features.Transport.entity.Transport;
import TravelBooking.features.Transport.enums.TransportStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingTransportRequest {
    @NotNull(message = "Vui lòng chọn phương tiện")
    private Long transportId;

    @NotBlank(message = "Vui lòng nhập họ và tên của bạn")
    private String customerName;

    @NotBlank(message = "Vui lòng nhập số điện thoại")
    private String customerPhone;

    @Email(message = "Email không đúng định dạng")
    private String customerEmail;

    @NotNull(message = "Vui lòng chọn ngày bắt đầu")
    @FutureOrPresent(message = "Ngày bắt đầu không được ở trong quá khứ")
    private LocalDate startDate;

    private LocalDate endDate; // Dùng khi thuê ô tô / xe máy theo ngày

    @Min(value = 1, message = "Số lượng phải ít nhất là 1")
    private Integer quantity = 1;

    @Length(max = 1000)
    private String note;

    private String paymentMethod;

    private LocalDateTime createTime;

    private TransportStatus status;

    private Long totalPrice;
    
}
