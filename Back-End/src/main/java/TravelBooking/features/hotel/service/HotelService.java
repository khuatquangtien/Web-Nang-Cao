package TravelBooking.features.hotel.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import TravelBooking.features.hotel.entity.Hotel;

public interface HotelService {
    Page<Hotel> getAllHotel(Pageable pageable);

    List<Hotel> searchHotel(String keyword);

    Hotel getHotelById(Long id);

    Page<Hotel> getAllPopularHotel(Pageable pageable);

    void deleteHotel(Long id);

    Hotel createHotel(Hotel hotel);

    Hotel updateHotel(Long id, Hotel hotel);
}
