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
    <div className="hero-banner p-4 p-md-5 rounded-4 position-relative overflow-hidden" style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)",
      boxShadow: "var(--shadow-xl)",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    }}>
      {/* Background Decorative Circles */}
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)",
        top: "-80px",
        right: "-80px",
        pointerEvents: "none"
      }}></div>

      <div className="position-relative" style={{ zIndex: 2 }}>
        <span className="badge px-3 py-2 rounded-pill mb-3" style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(8px)",
          color: "#93c5fd",
          fontSize: "0.85rem",
          fontWeight: "600",
          letterSpacing: "0.5px"
        }}>
          ✨ Khám phá trải nghiệm đẳng cấp 5 sao
        </span>

        <h1 className="hero-title fw-bold text-white mb-2" style={{ fontSize: "2.4rem", letterSpacing: "-1px" }}>
          Tìm kiếm kỳ nghỉ trong mơ
        </h1>
        <p className="hero-subtitle text-white-50 mb-4" style={{ fontSize: "1.05rem", maxWidth: "600px" }}>
          Hàng ngàn tour du lịch độc đáo, resort sang trọng với ưu đãi độc quyền dành riêng cho bạn
        </p>

        {/* KHUNG TÌM KIẾM TRẮNG SANG TRỌNG */}
        <div className="search-box p-3 p-md-4 rounded-4 shadow-lg bg-white" style={{ border: "1px solid #e2e8f0" }}>
          {/* Tab lựa chọn */}
          <div className="d-flex gap-3 mb-3 border-bottom pb-2">
            <button className="btn btn-sm rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-2" style={{
              background: "var(--primary-light)",
              color: "var(--primary)",
              border: "none"
            }}>
              <i className="bi bi-geo-alt-fill"></i> Tour du lịch
            </button>
            <button className="btn btn-sm rounded-pill px-3 py-2 fw-semibold text-secondary d-flex align-items-center gap-2" style={{
              background: "transparent",
              border: "none"
            }} onClick={() => navigate("/hotel")}>
              <i className="bi bi-building"></i> Khách sạn
            </button>
          </div>

          {/* INPUTS VÀ NÚT TÌM */}
          <div className="d-flex flex-column flex-md-row gap-2 mt-2">
            <div className="position-relative flex-grow-1">
              <div className="search-input-wrapper position-relative">
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-primary" style={{ fontSize: "1.1rem" }}></i>
                <input
                  type="text"
                  className="form-control rounded-pill py-2 ps-5 pe-4"
                  placeholder="Bạn muốn đến đâu? (Đà Nẵng, Phú Quốc, Sapa...)"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  autoComplete="off"
                  style={{ fontSize: "0.95rem", borderColor: "#cbd5e1", height: "48px" }}
                />

                {/* --- DANH SÁCH KẾT QUẢ DROPDOWN --- */}
                {keyword && tours.length > 0 && (
                  <div className="search-dropdown rounded-4 shadow-xl border overflow-hidden">
                    {tours.map((tour) => (
                      <Link
                        to={`/tours/${tour.id}`}
                        key={tour.id}
                        className="search-dropdown-item d-flex align-items-center p-3 text-decoration-none"
                        onClick={() => setKeyword("")}
                      >
                        <img
                          src={tour.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"}
                          alt={tour.title}
                          className="search-thumb rounded-3"
                          style={{ width: "48px", height: "48px", objectFit: "cover" }}
                        />
                        <div className="search-info ms-3">
                          <h6 className="mb-0 fw-bold text-dark">{tour.title}</h6>
                          <span className="text-muted small">
                            <i className="bi bi-geo-alt me-1"></i>
                            {tour.city || "Việt Nam"}
                          </span>
                        </div>
                        <div className="search-price ms-auto fw-bold text-primary">
                          {tour.price ? tour.price.toLocaleString("vi-VN") : "0"} đ
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={searchHandler}
              className="btn rounded-pill px-4 fw-bold text-white d-flex align-items-center justify-content-center gap-2"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                border: "none",
                boxShadow: "var(--shadow-glow)",
                height: "48px",
                minWidth: "140px"
              }}
            >
              <i className="bi bi-search"></i> Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
