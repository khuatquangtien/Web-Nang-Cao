	package TravelBooking.controller;

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
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.entity.Hotel;
import TravelBooking.repository.HotelRepository;

@RestController
@RequestMapping("/hotels")
//@CrossOrigin(origins = "http://localhost:3000") 

public class HotelController {
	@Autowired
	private HotelRepository hotelRepository;
	
	//Dành cho khách hàng
	// lấy tất cả danh sách hotel(user)
	@GetMapping
	public List<Hotel> getAllHotel(){
		return hotelRepository.findAll();
	}
	// tìm kiếm theo từ khoá (thanh tìm kiếm)(user)
	@GetMapping("/search")
	public List<Hotel> searchHotelById(@PathVariable String keyword){
		return hotelRepository.findByNameContainingIgnoreCase(keyword);
	}
	// lấy chi tiết 1 khách sạn(user)
	@GetMapping("/id")
	public Optional<Hotel> getHotelById(@PathVariable Long id) {
		return hotelRepository.findById(id);
	}
//	// lấy các Hotels nổi bật
	@GetMapping("/featuresHotels")
	public List<Hotel> getAllFeaturesHotel(){
		return hotelRepository.findTop5ByOrderByAverageRatingDesc();
	}
	// lấy khách sạn lọc theo địa điểm
//	@GetMapping("/location/{location}")
//	public List<Hotel> getHotelByLocation(@RequestParam String location ){
//		return hotelRepository.findByLocation(location);
//	}
	// lấy khách sạn lọc theo tiêu chí
	
	///Dành cho ADMIN
	//xoá khách sạn(admin)
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteHotel(@PathVariable Long id) {
		 
		try {
			hotelRepository.deleteById(id);
			return ResponseEntity.ok("Đã xoá khách sạn thành công");
		}catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(HttpStatusCode.valueOf(500)).body("Lỗi khi xoá");
		}
	}
	
	// thêm khách sạn
	@PostMapping()
	public Hotel createHotel(@RequestBody Hotel hotel) {
		return hotelRepository.save(hotel);
	}
	// cập nhật thông tin mới cho khách sạn
	@PutMapping("/{id}")
	public ResponseEntity<String> updateHotel(@PathVariable Long id, @RequestBody Hotel hotelDetails ) {
		Optional<Hotel> optionalHotel = hotelRepository.findById(id);
		if(optionalHotel.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy khách sạn ");
		}
		Hotel hotel = optionalHotel.get();
		BeanUtils.copyProperties(hotelDetails, hotel, "id");
		return ResponseEntity.ok("cập nhật thành công");		
	}
	//
}
