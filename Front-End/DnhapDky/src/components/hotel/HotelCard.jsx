import React from "react";
import "../../styles/hotelcss/hotelCard.css"; // File CSS cấu hình giao diện ô khách sạn
import { BASE_URL } from "../../utils/config"; // Đường dẫn tới file config.js của bạn
const HotelCard = ({ hotel }) => {
  console.log("Dữ liệu 1 khách sạn từ Java gửi sang:", hotel);
  return (
    <div className="hotel-card">
      <div className="hotel-image-wrapper">
        {/* Dùng trường thumbnail_url từ model Java của bạn */}
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
            // Đề phòng link hỏng, tự thay bằng ảnh mặc định
            e.target.onerror = null;
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
          }}
        />
        <span className="hotel-badge">Hot</span>
      </div>
      <div className="hotel-info">
        <h4 className="hotel-name">{hotel.name}</h4>
        <p className="hotel-address">
          📍 {hotel.address || "Chưa cập nhật địa chỉ"}
        </p>

        <div className="hotel-footer-row">
          {/* Dùng trường averageRating và min_price */}
          <span className="hotel-rating">
            ⭐ {hotel.averageRating ? hotel.averageRating.toFixed(1) : "0.0"}
          </span>
          <span className="hotel-price">
            {hotel.min_price
              ? `${hotel.min_price.toLocaleString()} VNĐ`
              : "Liên hệ giá"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
