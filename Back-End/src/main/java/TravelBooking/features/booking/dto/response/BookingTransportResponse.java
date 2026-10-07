package TravelBooking.features.booking.dto.response;

import java.time.LocalDate;

import org.eclipse.angus.mail.handlers.message_rfc822;

import TravelBooking.features.Transport.entity.Transport;
import lombok.Data;

@Data
public class BookingTransportResponse {

    private Transport transport;
    private Long bookingId;
    private LocalDate starDate;
    private LocalDate endDate;
    private Integer quantity;
    private String mess;
}
