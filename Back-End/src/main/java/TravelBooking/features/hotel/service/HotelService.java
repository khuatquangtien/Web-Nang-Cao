package TravelBooking.features.hotel.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import TravelBooking.features.hotel.entity.Hotel;

public interface HotelService {
    List<Hotel> getAllHotel();

    List<Hotel> searchHotel(String keyword);

    Hotel getHotelById(Long id);

    List<Hotel> getAllPopularHotel();

    void deleteHotel(Long id);

    Hotel createHotel(Hotel hotel);

    Hotel updateHotel(Long id, Hotel hotel);
}
