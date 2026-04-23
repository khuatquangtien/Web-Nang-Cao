package TravelBooking.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import TravelBooking.entity.Tour;
import TravelBooking.repository.TourRepository;

@ExtendWith(MockitoExtension.class)
public class TourControllerTest {

    @Mock
    private TourRepository tourRepository;

    @InjectMocks
    private TourController tourController;

    // ==========================================
    // TC01: Lấy danh sách tất cả Tour
    // ==========================================
    @Test
    public void testGetAllTours() {
        // Chuẩn bị dữ liệu
        List<Tour> mockList = new ArrayList<>();
        mockList.add(new Tour());
        mockList.add(new Tour());
        
        when(tourRepository.findAll()).thenReturn(mockList);

        // Thực thi
        List<Tour> result = tourController.getAllTours();

        // Đối chiếu
        assertEquals(2, result.size(), "Danh sách trả về phải có 2 phần tử");
        verify(tourRepository).findAll(); // Xác nhận hàm findAll() trong DB đã được gọi
    }

    // ==========================================
    // TC02: Thêm Tour mới
    // ==========================================
    @Test
    public void testCreateTour() {
        Tour newTour = new Tour();
        newTour.setTitle("Tour Đà Nẵng 3 ngày 2 đêm");

        when(tourRepository.save(newTour)).thenReturn(newTour);

        Tour result = tourController.createTour(newTour);

        assertNotNull(result, "Tour trả về không được null");
        assertEquals("Tour Đà Nẵng 3 ngày 2 đêm", result.getTitle());
    }

    // ==========================================
    // TC03: Tìm kiếm tour theo từ khóa
    // ==========================================
    @Test
    public void testSearchTours() {
        String keyword = "Hà Nội";
        List<Tour> mockResult = new ArrayList<>();
        mockResult.add(new Tour());

        when(tourRepository.findByTitleContainingIgnoreCase(keyword)).thenReturn(mockResult);

        List<Tour> result = tourController.searchTours(keyword);

        assertEquals(1, result.size());
        verify(tourRepository).findByTitleContainingIgnoreCase(keyword);
    }

    // ==========================================
    // TC04: Lấy danh sách Tour nổi bật
    // ==========================================
    @Test
    public void testGetFeaturedTours() {
        List<Tour> mockResult = new ArrayList<>();
        mockResult.add(new Tour());

        when(tourRepository.findByFeaturedTrue()).thenReturn(mockResult);

        List<Tour> result = tourController.getFeaturedTours();

        assertEquals(1, result.size());
        verify(tourRepository).findByFeaturedTrue();
    }

    // ==========================================
    // TC05: Lấy chi tiết Tour thành công
    // ==========================================
    @Test
    public void testGetTourById_Found() {
        Tour mockTour = new Tour();
        mockTour.setId(1L);
        mockTour.setTitle("Tour Sapa");

        when(tourRepository.findById(1L)).thenReturn(Optional.of(mockTour));

        ResponseEntity<Tour> response = tourController.getTourById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode(), "Phải trả về 200 OK");
        assertEquals("Tour Sapa", response.getBody().getTitle());
    }

    // ==========================================
    // TC06: Lấy chi tiết Tour thất bại (Không tồn tại)
    // ==========================================
    @Test
    public void testGetTourById_NotFound() {
        when(tourRepository.findById(99L)).thenReturn(Optional.empty());

        ResponseEntity<Tour> response = tourController.getTourById(99L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode(), "Phải trả về 404 Not Found");
    }
}