package TravelBooking.features.booking.dto.request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingTourRequest {

    private Long tourId;
    private Integer numPeople;
    private LocalDate bookingDate;
    private String customerName;
    private String customerPhone;
    private String note;

}
