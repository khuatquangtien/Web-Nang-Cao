package TravelBooking.features.booking.dto.response;

import java.time.LocalDate;

import TravelBooking.features.booking.entity.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data //
@AllArgsConstructor //
@NoArgsConstructor
public class BookingResponse {

    private Long id;

    private Long tourId;

    private String tourTitle;

    private String tourImage;

    private LocalDate bookingDate;

    private Integer numPeople;

    private double totalPrice;

    private BookingStatus status;
    private String customerName;
    private String customerPhone;
    private String note;
}
