import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config"; // Đường dẫn tới file config.js của bạn
import "../styles/hotelcss/hotelSection.css"; // File CSS cấu hình giao diện (nếu tách riêng)
import "../styles/hotelcss/hotel.css"; // File CSS chung (nếu cần)
import { useNavigate } from "react-router-dom";

const HotelPage = () => {
  const [hotels, setHotels] = useState([]); // Danh sách khách sạn hiển thị
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // --- LOGIC PHÂN TRANG TOUR ---
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const hotelsPerPage = 3; // Hiển thị đúng 6 khách sạn (2 hàng, 3 cột)

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  
  // Mảng 6 khách sạn của trang hiện tại
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel); 
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log("HotelPage đã chạy! Dữ liệu API hiện tại là:", hotels);

  // 1. Tự động gọi API lấy Khách sạn nổi bật
  useEffect(() => {
    fetchFeaturedHotels();
  }, []);

  const fetchFeaturedHotels = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/hotels/featuresHotels`);
      if (response.ok) {
        const data = await response.json();
        setHotels(data);
      } else {
        console.error("Không thể lấy dữ liệu khách sạn nổi bật");
      }
    } catch (error) {
      console.error("Lỗi kết nối API khách sạn nổi bật:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Hàm xử lý Tìm kiếm Khách sạn
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchFeaturedHotels();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/hotels/search?keyword=${encodeURIComponent(searchQuery)}`,
      );
      if (response.ok) {
        const data = await response.json();
        setHotels(data);
      } else {
        console.error("Lỗi khi tìm kiếm khách sạn");
      }
    } catch (error) {
      console.error("Lỗi kết nối API tìm kiếm:", error);
    } finally {
      setLoading(false);
    }
  };
return (
    <div className="hotel-container">
      {/* BANNER TÌM KIẾM */}

      {/* DANH SÁCH KHÁCH SẠN */}
      <div className="hotel-list-section">
        <h3 className="section-title">
          {searchQuery
            ? `Kết quả tìm kiếm cho "${searchQuery}"`
            : "Khách sạn & Chỗ nghỉ nổi bật"}
        </h3>

        {loading ? (
          <div className="loading">Đang tải danh sách khách sạn...</div>
        ) : hotels.length > 0 ? (
          // Dùng thẻ Fragment <></> để bọc grid và bộ nút phân trang lại với nhau
          <>
            {/* ĐỔI THÀNH currentHotels.map */}
            <div className="hotel-grid">
              {currentHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="hotel-card"
                  onClick={() => navigate(`/hotel/${hotel.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="image-wrapper">
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
                    />
                    <span className="badge-hot">Hot</span>
                  </div>

                  <div className="card-info">
                    <h4>{hotel.name}</h4>
                    <p className="location">
                      📍 {hotel.address || "Chưa cập nhật địa điểm"}
                    </p>

                    {hotel.averageRating && (
                      <p className="rating">
                        ⭐ {hotel.averageRating.toFixed(1)} / 5
                      </p>
                    )}

                    <div className="price-section">
                      <span className="price">
                        {hotel.min_price
                          ? `${hotel.min_price.toLocaleString()} VNĐ`
                          : "Liên hệ giá"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* THANH PHÂN TRANG BOOTSTRAP (Tự động ẩn nếu tổng số khách sạn ít hơn hoặc bằng 6) */}
            {totalPages > 1 && (
              <nav aria-label="Hotel page navigation" className="mt-5">
                <ul className="pagination justify-content-center">
                  {/* Nút Trước */}
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                      Trước
                    </button>
                  </li>
                  
                  {/* Các nút số 1, 2, 3... */}
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}

                  {/* Nút Sau */}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                      Sau
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        ) : (
          <div className="no-result">Không tìm thấy khách sạn nào phù hợp.</div>
        )}
      </div>
    </div>
  );
};

export default HotelPage;
