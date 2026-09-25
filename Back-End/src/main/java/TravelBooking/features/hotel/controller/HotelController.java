package TravelBooking.features.hotel.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.features.hotel.entity.Hotel;
import TravelBooking.features.hotel.repository.HotelRepository;
import TravelBooking.features.hotel.service.HotelService;

@RestController
@RequestMapping("/hotels")
// @CrossOrigin(origins = "http://localhost:3000")

public class HotelController {
	@Autowired
	private HotelService hotelService;

	// Dành cho khách hàng
	// lấy tất cả danh sách hotel(user)
	@GetMapping
	public ResponseEntity<List<Hotel>> getAllHotel() {
		List<Hotel> list = hotelService.getAllHotel();
		return ResponseEntity.ok(list);
	}

	// tìm kiếm theo từ khoá (thanh tìm kiếm)(user)
	@GetMapping("/search")
	public ResponseEntity<List<Hotel>> searchHotel(@RequestParam String keyword) {
		List<Hotel> list = hotelService.searchHotel(keyword);
		return ResponseEntity.ok(list);
	}

	// lấy chi tiết 1 khách sạn(user)
	@GetMapping("/{id}")
	public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
		Hotel hotel = hotelService.getHotelById(id);
		return ResponseEntity.ok(hotel);
	}

	// // lấy các Hotels nổi bật
	@GetMapping("/featuresHotels")
	public ResponseEntity<List<Hotel>> getAllPopularHotel() {
		List<Hotel> list = hotelService.getAllPopularHotel();
		return ResponseEntity.ok(list);
	}

	// lấy khách sạn lọc theo địa điểm
	// @GetMapping("/location/{location}")
	// public List<Hotel> getHotelByLocation(@RequestParam String location ){
	// return hotelRepository.findByLocation(location);
	// }
	// lấy khách sạn lọc theo tiêu chí

	/// Dành cho ADMIN
	// xoá khách sạn(admin)
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteHotel(@PathVariable Long id) {

		hotelService.deleteHotel(id);
		return ResponseEntity.ok("Đã xoá khách sạn thành công");

	}

	// thêm khách sạn
	@PostMapping()
	public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel) {
		Hotel hotelUpdated = hotelService.createHotel(hotel);
		return ResponseEntity.status(HttpStatus.CREATED).body(hotelUpdated);
	}

	// cập nhật thông tin mới cho khách sạn
	@PutMapping("/{id}")
	public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel hotelDetails) {
		Hotel hotelupdated = hotelService.updateHotel(id, hotelDetails);
		return ResponseEntity.ok(hotelupdated);
	}
	//
}
