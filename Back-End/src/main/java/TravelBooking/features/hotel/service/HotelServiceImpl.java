package TravelBooking.features.hotel.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import TravelBooking.features.booking.entity.Booking;
import TravelBooking.features.booking.repository.BookingRepository;
import TravelBooking.features.hotel.entity.Hotel;
import TravelBooking.features.hotel.repository.HotelRepository;
import jakarta.transaction.Transactional;

@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    HotelRepository hotelRepository;
    @Autowired
    BookingRepository bookingRepository;

    @Override
    public List<Hotel> getAllHotel() {
        return hotelRepository.findAll();
    }

    @Override
    public List<Hotel> searchHotel(String keyword) {
        return hotelRepository.findByNameContainingIgnoreCase(keyword);
    }

    @Override
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Khách sạn không tồn tại!"));
    }

    @Override
    public List<Hotel> getAllPopularHotel() {
        return hotelRepository.findTop5ByOrderByAverageRatingDesc();
    }

    @Transactional
    @Override
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }

    @Transactional
    @Override
    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @Transactional
    @Override
    public Hotel updateHotel(Long id, Hotel hotel) {
        Hotel existingHotel = getHotelById(id);
        existingHotel.setName(hotel.getName());
        existingHotel.setSlug(hotel.getSlug());
        existingHotel.setAddress(hotel.getAddress());
        existingHotel.setDescription(hotel.getDescription());
        existingHotel.setPhone_number(hotel.getPhone_number());
        existingHotel.setEmail(hotel.getEmail());
        existingHotel.setStarRating(hotel.getStarRating());
        existingHotel.setAverageRating(hotel.getAverageRating());
        existingHotel.setReview_count(hotel.getReview_count());
        existingHotel.setThumbnail_url(hotel.getThumbnail_url());
        existingHotel.setMin_price(hotel.getMin_price());
        existingHotel.setLocation_id(hotel.getLocation_id());
        existingHotel.setIs_active(hotel.getIs_active());
        return hotelRepository.save(existingHotel);

    }

}
