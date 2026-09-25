package TravelBooking.features.tour.service;

import java.util.List;
import java.util.Optional;

import TravelBooking.features.tour.entity.Tour;

public interface TourService {

    public List<Tour> getAllTours();

    public Tour createTour(Tour newTour);

    public List<Tour> searchTours(String keyword);

    public List<Tour> getFeaturedTours();

    public Tour getTourById(long tourid);

    public void deleteTour(long tourId);

    public Tour updateTour(long tourId, Tour tour);

}
