import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hotelService } from "../../services/hotelService";
import BackButton from "../../components/common/BackButton";
import { BASE_URL } from "../../utils/config";

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    checkInDate: ""
  });

  useEffect(() => {
    const fetchHotelDetail = async () => {
      try {
        const res = await hotelService.getById(id);
        const data = res.data?.data ? res.data.data : res.data;
        setHotel(data);
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
        body: JSON.stringify({
          hotelId: id,
          customerName: formData.customerName,
          customerEmail: formData.email,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkInDate,
          totalPrice: hotel.min_price || 0
        })
      });

      const data = await response.json();
      if (response.ok) {
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          alert("Đặt phòng thành công!");
          setShowForm(false);
        }
      } else {
        alert("Lỗi đặt phòng: " + (data.message || "Không xác định"));
      }
    } catch (error) {
      console.error("Lỗi khi gọi API đặt phòng:", error);
      alert("Không thể kết nối đến máy chủ thanh toán!");
    } finally {
      setIsBooking(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Đang tải thông tin khách sạn...</div>;
  }

  if (!hotel) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Không tìm thấy khách sạn!</div>;
  }

  return (
    <div
      className="hotel-detail-container"
      style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* NÚT QUAY LẠI TIÊU CHUẨN */}
      <div className="mb-4">
        <BackButton label="Quay lại danh sách khách sạn" fallback="/hotel" />
      </div>

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
            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
          }}
          style={{
            width: "100%",
            height: "450px",
            objectFit: "cover",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
          }}
        />
      </div>

      {/* THÔNG TIN CHI TIẾT */}
      <div className="hotel-detail-content" style={{ display: "flex", gap: "40px" }}>
        {/* CỘT TRÁI: THÔNG TIN CHÍNH */}
        <div style={{ flex: "2" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "15px", color: "#1f2937" }}>
            {hotel.name}
          </h1>

          <p style={{ color: "#4b5563", fontSize: "1.1rem", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
            📍 {hotel.address || "Địa chỉ chưa cập nhật"}
          </p>

          <p style={{ color: "#eab308", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "25px" }}>
            ⭐ {hotel.rating ? `${hotel.rating} / 5 Đánh giá` : "Chưa có đánh giá"}
          </p>

          <hr style={{ border: "0", borderTop: "1px solid #e5e7eb", margin: "25px 0" }} />

          <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", color: "#111827" }}>
            Mô tả chi tiết
          </h3>
          <p style={{ lineHeight: "1.8", color: "#374151", whiteSpace: "pre-line" }}>
            {hotel.description || "Khách sạn hiện chưa có bài viết mô tả chi tiết."}
          </p>
        </div>

        {/* CỘT PHẢI: KHUNG ĐẶT PHÒNG NHANH */}
        <div style={{ flex: "1" }}>
          <div
            style={{
              padding: "25px",
              border: "1px solid #e5e7eb",
              borderRadius: "15px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              backgroundColor: "#ffffff",
              position: "sticky",
              top: "20px"
            }}
          >
            <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>Giá phòng từ</span>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ef4444", marginBottom: "20px" }}>
              {hotel.min_price ? `${hotel.min_price.toLocaleString("vi-VN")} đ` : "Liên hệ"}
              <span style={{ fontSize: "1rem", color: "#9ca3af", fontWeight: "normal" }}> / đêm</span>
            </div>

            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background 0.3s"
                }}
              >
                Đặt phòng ngay
              </button>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "5px", color: "#374151" }}>Họ và tên:</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "5px", color: "#374151" }}>Email liên hệ:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "5px", color: "#374151" }}>Ngày nhận phòng:</label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isBooking}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: isBooking ? "#9ca3af" : "#10b981",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: isBooking ? "not-allowed" : "pointer",
                    marginTop: "10px"
                  }}
                >
                  {isBooking ? "Đang xử lý..." : "Xác nhận & Thanh toán"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    backgroundColor: "transparent",
                    color: "#6b7280",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem"
                  }}
                >
                  Hủy bỏ
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
