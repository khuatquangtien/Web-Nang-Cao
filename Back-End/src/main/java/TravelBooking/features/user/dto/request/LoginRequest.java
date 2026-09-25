package TravelBooking.features.user.dto.request;

import lombok.Data;

@Data
public class LoginRequest {

    private String password;
    private String username;

}
