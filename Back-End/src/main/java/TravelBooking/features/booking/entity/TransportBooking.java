package TravelBooking.features.booking.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.cglib.core.Local;

import TravelBooking.features.Transport.entity.Transport;
import TravelBooking.features.Transport.enums.TransportStatus;
import TravelBooking.features.Transport.enums.TransportType;
import TravelBooking.features.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TransportBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transport_id", nullable = true)
    private Transport transport;

    @Column(name = "customer_name")
    private String customerName;
    @Column(name = "customer_phone")
    private String customerPhone;
    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Enumerated(EnumType.STRING)
    private TransportStatus status;

    @Column(name = "note", length = 1000)
    private String note;
    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "total_price")
    private Long totalPrice;
}
