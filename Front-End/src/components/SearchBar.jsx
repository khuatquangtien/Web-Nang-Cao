import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css"; // Import file CSS của bạn

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();
  // Logic Debounce (Tìm kiếm tự động sau 0.5s)
  useEffect(() => {
    if (keyword.trim() === "") {
      setTours([]);
      return;
    }

    const timer = setTimeout(() => {
      axios
        .get(`http://localhost:9090/tours/search?keyword=${keyword}`)
        .then((res) => setTours(res.data))
        .catch((err) => console.log(err));
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);
  //nút tìm kiếm
  const searchHandler = () => {
    const keywordClean = keyword.trim();
    if ( keywordClean === "") {
      return alert("Vui lòng tour bạn tìm kiếm");
    }
    navigate(`/tours/search?keyword=${keywordClean}`);

  }

  return (
    <div className="hero-banner">
      <h1 className="hero-title">Khám phá thế giới cùng chúng tôi</h1>
      <p className="hero-subtitle">
        Tìm kiếm các tour du lịch tốt nhất với giá ưu đãi
      </p>

      {/* KHUNG TÌM KIẾM TRẮNG */}
      <div className="search-box">
        {/* Tab lựa chọn (Tour, Khách sạn...) */}
        <div className="search-tabs">
          <div className="search-tab-item active">
            <i className="ri-map-pin-line"></i> Tour du lịch
          </div>
          <div className="search-tab-item">
            <i className="ri-hotel-bed-line"></i> Khách sạn
          </div>
        </div>

        {/* INPUTS VÀ NÚT TÌM */}
        <div className="search-inputs">
          <div className="search-input-group" style={{ flex: 3 }}>
            {/* Wrapper này có position: relative để dropdown bám vào */}
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Bạn muốn đi đâu? (Hà Nội, Đà Nẵng...)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                autoComplete="off" // Tắt gợi ý lịch sử của trình duyệt cho đẹp
              />

              {/* --- DANH SÁCH KẾT QUẢ DROPDOWN --- */}
              {keyword && tours.length > 0 && (
                <div className="search-dropdown">
                  {tours.map((tour) => (
                    <Link
                      to={`/tours/${tour.id}`}
                      key={tour.id}
                      className="search-dropdown-item"
                      onClick={() => setKeyword("")} // Click xong thì đóng menu
                    >
                      {/* Ảnh */}
                      <img
                        src={tour.image || "https://via.placeholder.com/50"}
                        alt={tour.title}
                        className="search-thumb"
                      />

                      {/* Tên và Địa điểm */}
                      <div className="search-info">
                        <h6>{tour.title}</h6>
                        <span>
                          <i className="ri-map-pin-line"></i> {tour.city}
                        </span>
                      </div>

                      {/* Giá tiền */}
                      <span className="search-price">${tour.price}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Thông báo nếu không tìm thấy */}
              {keyword &&
                tours.length === 0 &&
                keyword.trim() !== "" &&
                // Tùy chọn: Bạn có thể hiện dòng "Không tìm thấy" hoặc để trống
                null}
            </div>
          </div>

          {/* Ô nhập ngày (nếu cần)
          <div className="search-input-group" style={{ flex: 1 }}>
            <input type="date" />
          </div> */}

          {/* Nút tìm kiếm (Giữ lại cho đẹp bố cục) */}
          <button className="search-btn" onClick={searchHandler}>Tìm kiếm</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
