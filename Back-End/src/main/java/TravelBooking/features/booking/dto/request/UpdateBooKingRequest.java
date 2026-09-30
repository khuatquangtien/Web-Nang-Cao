package TravelBooking.features.booking.dto.request;

import TravelBooking.features.booking.entity.BookingStatus;
import lombok.Data;

@Data
public class UpdateBooKingRequest {
    private BookingStatus status;
}
