package TravelBooking.features.tour.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TravelBooking.features.tour.entity.Tour;
import TravelBooking.features.tour.repository.TourRepository;
import jakarta.transaction.Transactional;

@Service
public class TourServiceImpl implements TourService {

    @Autowired
    private TourRepository tourRepository;

    @Override
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    @Override
    public Tour createTour(Tour newTour) {
        return tourRepository.save(newTour);
    }

    @Override
    public List<Tour> searchTours(String keyword) {
        return tourRepository.findByTitleContainingIgnoreCase(keyword);
    }

    @Override
    public List<Tour> getFeaturedTours() {
        return tourRepository.findByFeaturedTrue();
    }

    @Override
    public Tour getTourById(long tourId) {
        return tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour không tồn tại với id: " + tourId));
    }

    @Override
    public void deleteTour(long tourId) {
        Tour existingTour = getTourById(tourId);
        tourRepository.delete(existingTour);
    }

    @Transactional
    @Override
    public Tour updateTour(long tourId, Tour tour) {
        Tour existingTour = getTourById(tourId); // Tự động ném lỗi nếu không tồn tại

        // 1. Cập nhật các trường cơ bản
        existingTour.setTitle(tour.getTitle());
        existingTour.setPrice(tour.getPrice());
        existingTour.setCity(tour.getCity());
        existingTour.setImage(tour.getImage());

        // 2. Cập nhật các trường chi tiết
        existingTour.setAddress(tour.getAddress());
        existingTour.setDistance(tour.getDistance());
        existingTour.setDescription(tour.getDescription());
        existingTour.setMaxGroupSize(tour.getMaxGroupSize());
        existingTour.setFeatured(tour.getFeatured());

        return tourRepository.save(existingTour);
    }

}
