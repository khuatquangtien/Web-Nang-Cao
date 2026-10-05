package TravelBooking.features.tour.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import TravelBooking.features.tour.entity.Tour;

public interface TourService {

    public Page<Tour> getAllTours(Pageable pageable);

    public Tour createTour(Tour newTour);

    public List<Tour> searchTours(String keyword);

    public Tour getTourById(long tourid);

    public void deleteTour(long tourId);

    public Tour updateTour(long tourId, Tour tour);

    public Page<Tour> getFeaturedTours(Pageable pageable);
}
