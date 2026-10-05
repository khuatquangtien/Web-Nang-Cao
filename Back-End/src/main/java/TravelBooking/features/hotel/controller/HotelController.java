package TravelBooking.features.hotel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.common.dto.request.PaginationRequest;
import TravelBooking.common.dto.response.ApiResponse;
import TravelBooking.common.dto.response.PageResponse;
import TravelBooking.features.hotel.entity.Hotel;
import TravelBooking.features.hotel.service.HotelService;

@RestController
@RequestMapping("/hotels")
public class HotelController {

	@Autowired
	private HotelService hotelService;

	// Lấy tất cả danh sách khách sạn
	@GetMapping
	public ResponseEntity<ApiResponse<PageResponse<Hotel>>> getAllHotel(PaginationRequest request) {
		Page<Hotel> list = hotelService.getAllHotel(request.toPageable());
		return ResponseEntity.ok(ApiResponse.<PageResponse<Hotel>>success(PageResponse.from(list)));
	}

	// Tìm kiếm theo từ khóa
	@GetMapping("/search")
	public ResponseEntity<ApiResponse<List<Hotel>>> searchHotel(@RequestParam String keyword) {
		List<Hotel> list = hotelService.searchHotel(keyword);
		return ResponseEntity.ok(ApiResponse.success(list));
	}

	// Lấy chi tiết 1 khách sạn
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<Hotel>> getHotelById(@PathVariable Long id) {
		Hotel hotel = hotelService.getHotelById(id);
		return ResponseEntity.ok(ApiResponse.success(hotel));
	}

	// Lấy các khách sạn nổi bật
	@GetMapping("/featuresHotels")
	public ResponseEntity<ApiResponse<PageResponse<Hotel>>> getAllPopularHotel(PaginationRequest request) {
		Page<Hotel> list = hotelService.getAllPopularHotel(request.toPageable());
		return ResponseEntity.ok(ApiResponse.<PageResponse<Hotel>>success(PageResponse.from(list)));
	}

	// Xóa khách sạn (Admin)
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteHotel(@PathVariable Long id) {
		hotelService.deleteHotel(id);
		return ResponseEntity.ok(ApiResponse.success("Đã xóa khách sạn thành công", null));
	}

	// Thêm khách sạn mới (Admin)
	@PostMapping
	public ResponseEntity<ApiResponse<Hotel>> createHotel(@RequestBody Hotel hotel) {
		Hotel created = hotelService.createHotel(hotel);
		return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Tạo khách sạn thành công", created));
	}

	// Cập nhật thông tin khách sạn (Admin)
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<Hotel>> updateHotel(@PathVariable Long id, @RequestBody Hotel hotelDetails) {
		Hotel updated = hotelService.updateHotel(id, hotelDetails);
		return ResponseEntity.ok(ApiResponse.success("Cập nhật khách sạn thành công", updated));
	}
}