import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config"; // 🌟 Đảm bảo đã import config này nhé
import { useParams, useNavigate } from "react-router-dom";
const HotelDetail = () => {
  const { id } = useParams(); // Nhận id (hoặc slug) từ Route thanh địa chỉ URL
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // 🌟 Thêm dòng này để dùng hàm chuyển trang
  const [showForm, setShowForm] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "", // 🌟 Key ở đây đang đặt tên là 'email'
    checkInDate: ""
  });

  useEffect(() => {
    // Gọi API lấy dữ liệu chi tiết của 1 khách sạn theo ID
    const fetchHotelDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/hotels/${id}`);
        if (response.ok) {
          const data = await response.json();
          setHotel(data);
        } else {
          console.error("Không tìm thấy khách sạn");
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHotelDetail();
  }, [id]);

  // --- HÀM XỬ LÝ GỌI API ĐẶT PHÒNG ---
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsBooking(true);

    try {
      const response = await fetch(`${BASE_URL}/bookings/hotel/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Gửi dữ liệu đồng bộ chính xác với Class BookingHotelRequest bên Java
        body: JSON.stringify({
          hotelId: hotel.id,                   // Khớp với request.getHotelId()
          customerName: formData.customerName, // Khớp với request.getCustomerName()
          customerEmail: formData.email,       // 🌟 ĐÃ SỬA: lấy chính xác từ formData.email
          checkInDate: formData.checkInDate    // Khớp với request.getCheckInDate()
        }),
      });

      if (response.ok) {
        const data = await response.json(); 
        
        // Hiện thông báo trả về từ Backend (ví dụ: "Đặt phòng thành công!...")
        // Lưu ý: Đảm bảo Map bên Backend trả về key tên là "message" nhé
        alert("🎉 " + (data.message || "Đặt phòng thành công!")); 
        
        // Reset form và ẩn form đi
        setFormData({ customerName: "", email: "", checkInDate: "" });
        setShowForm(false); 
      } else {
        alert("Có lỗi xảy ra từ máy chủ, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi đặt phòng:", error);
      alert("Không thể kết nối đến máy chủ Backend!");
    } finally {
      setIsBooking(false);
    }
  };

  if (loading)
    return <div className="loading">Đang tải thông tin khách sạn...</div>;
  if (!hotel)
    return <div className="error">Không tìm thấy thông tin khách sạn!</div>;
  return (
    <div
      className="hotel-detail-container"
      style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* 🌟 THÊM NÚT QUAY LẠI TẠI ĐÂY */}
      <button 
        onClick={() => navigate(-1)} // Lệnh navigate(-1) nghĩa là lùi lại 1 trang trong lịch sử
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#015aa8', // Màu xám trung tính
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
      >
         Quay lại
      </button>
      {/* ẢNH BÌA KHÁCH SẠN */}
      <div className="hotel-detail-header" style={{ marginBottom: "30px" }}>
        <img
          src={
            hotel.thumbnail_url
              ? hotel.thumbnail_url.startsWith("http")
                ? hotel.thumbnail_url
                : `${BASE_URL}${hotel.thumbnail_url}`
              : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
          }
          alt={hotel.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
          }}
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      </div>

      {/* THÔNG TIN CHI TIẾT */}
      <div className="hotel-detail-content">
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          {hotel.name}
        </h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>📍 {hotel.address}</p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            margin: "20px 0",
            fontSize: "1.2rem",
          }}
        >
          <span style={{ fontWeight: "bold", color: "#ffb703" }}>
            ⭐ {hotel.averageRating ? hotel.averageRating.toFixed(1) : "0"} / 5
            ({hotel.review_count} đánh giá)
          </span>
          <span style={{ fontWeight: "bold", color: "#e63946" }}>
            Giá từ:{" "}
            {hotel.min_price
              ? `${hotel.min_price.toLocaleString()} VNĐ`
              : "Đang cập nhật"}
          </span>
        </div>

        <div
          className="hotel-description"
          style={{ marginTop: "30px", lineHeight: "1.8" }}
        >
          <h3>Giới thiệu chỗ nghỉ</h3>
          <p>
            {hotel.description || "Khách sạn chưa cập nhật bài giới thiệu."}
          </p>
        </div>

        <div
          className="hotel-contact"
          style={{
            marginTop: "30px",
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Thông tin liên hệ</h3>
          <p>📞 Điện thoại: {hotel.phone_number || "Đang cập nhật"}</p>
          <p>✉️ Email: {hotel.email || "Đang cập nhật"}</p>
        </div>

        {/* --- ĐOẠN THAY THẾ BẮT ĐẦU TỪ ĐÂY --- */}
        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)} // 🌟 Đây là lệnh kích hoạt mở Form
            style={{ 
              marginTop: '30px', 
              padding: '15px 30px', 
              fontSize: '1.2rem', 
              backgroundColor: '#0056b3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer' 
            }}>
            Chọn phòng ngay
          </button>
        ) : (
          /* FORM NHẬP THÔNG TIN SẼ HIỆN RA KHI BẤM NÚT */
          <div style={{ marginTop: '30px', padding: '20px', border: '2px solid #0056b3', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '20px', color: '#0056b3' }}>Nhập thông tin đặt phòng</h3>
            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
              <input 
                type="text" required placeholder="Họ và tên của bạn" 
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                style={{ padding: '10px', fontSize: '1rem' }}
              />
              <input 
                type="email" required placeholder="Địa chỉ Email (để nhận xác nhận)" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{ padding: '10px', fontSize: '1rem' }}
              />
              <input 
                type="date" required 
                value={formData.checkInDate}
                onChange={(e) => setFormData({...formData, checkInDate: e.target.value})}
                style={{ padding: '10px', fontSize: '1rem' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="submit" disabled={isBooking}
                  style={{ padding: '12px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>
                  {isBooking ? "Đang gửi..." : "Xác nhận đặt phòng"}
                </button>
                <button 
                  type="button" onClick={() => setShowForm(false)} // 🌟 Lệnh này để Đóng form
                  style={{ padding: '12px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}
        {/* --- ĐOẠN THAY THẾ KẾT THÚC Ở ĐÂY --- */}
      </div>
    </div>
  );
};

export default HotelDetail;
