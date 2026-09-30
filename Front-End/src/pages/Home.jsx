import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import "../styles/home.css";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import HotelPage from "./HotelPage"; // Import component khách sạn nổi bật1
const Home = () => {
  const [tours, setTours] = useState([]);
  const [toursFeatured, setToursFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const toursPerPage = 6; // Số lượng tour hiển thị trên 1 trang (3 hàng x 3 cột)
  // --- LOGIC PHÂN TRANG TOUR ---
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour); // Lấy ra 9 tour của trang hiện tại
  const totalPages = Math.ceil(tours.length / toursPerPage); // Tính tổng số trang

  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Hàm chuyển trang
  
  // Logic lấy tất cả tour
  useEffect(() => {
    axios
      .get(`${BASE_URL}/tours`)
      .then((res) => {
        const data = res.data && res.data.data ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        setTours(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Không thể kết nối đến Server!");
        setLoading(false);
      });
  }, []);

  // Logic lấy tour nổi bật
  useEffect(() => {
    axios
      .get(`${BASE_URL}/tours/search/getFeaturedTours`)
      .then((res) => {
        const data = res.data && res.data.data ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        setToursFeatured(data);
        setLoadingFeatured(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorFeatured("Không thể kết nối đến Server!");
        setLoadingFeatured(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* --- CỘT TRÁI: SIDEBAR (Chiếm 3/12 phần chiều rộng) --- */}
        <div className="col-lg-3">
          <div className="sticky-top" style={{ top: "20px", zIndex: "1" }}>
            {/* Component Sidebar của bạn được đặt ở đây */}
            <Sidebar />
          </div>
        </div>

        {/* --- CỘT PHẢI: NỘI DUNG CHÍNH (Chiếm 9/12 phần chiều rộng) --- */}
        <div className="col-lg-9">
          {/* 1. SEARCH BAR */}
          <div className="mb-5">
            <SearchBar />
          </div>

          {/* 2. PHẦN TOUR NỔI BẬT */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <span className="badge px-3 py-1 rounded-pill mb-1" style={{ background: "#fef3c7", color: "#d97706", fontWeight: "700" }}>
                🌟 LỰA CHỌN HÀNG ĐẦU
              </span>
              <h3 className="fw-bold mb-0 text-dark" style={{ letterSpacing: "-0.5px" }}>Tour du lịch nổi bật</h3>
            </div>
            <Link to="/tours" className="text-primary fw-semibold text-decoration-none d-flex align-items-center gap-1">
              Xem tất cả <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {loadingFeatured && <p className="text-muted">Đang tải những trải nghiệm tuyệt vời nhất...</p>}
          {errorFeatured && <p className="text-danger">{errorFeatured}</p>}

          <div className="row g-4 mb-5">
            {toursFeatured.map((tour) => (
              <div className="col-md-6 col-xl-4" key={tour.id}>
                <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm bg-white" style={{
                  transition: "var(--transition-smooth)",
                  boxShadow: "var(--shadow-md)"
                }}>
                  <div className="position-relative overflow-hidden" style={{ height: "210px" }}>
                    <span className="position-absolute top-0 start-0 m-3 badge px-3 py-2 rounded-pill fw-bold" style={{
                      background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 10px rgba(239, 68, 68, 0.4)",
                      zIndex: 2
                    }}>
                      🔥 Nổi bật
                    </span>
                    <img
                      src={tour.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"}
                      className="w-100 h-100"
                      alt={tour.title}
                      style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
                      }}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                        <i className="bi bi-geo-alt text-primary"></i>
                        <span>{tour.city || "Việt Nam"}</span>
                      </div>
                      <h5 className="card-title fw-bold text-dark mb-3" style={{ fontSize: "1.05rem", lineHeight: "1.4" }}>
                        {tour.title}
                      </h5>
                    </div>

                    <div className="pt-3 border-top d-flex align-items-center justify-content-between mt-auto">
                      <div>
                        <span className="text-muted small d-block">Giá chỉ từ</span>
                        <span className="fw-bold text-primary fs-5">
                          {tour.price ? tour.price.toLocaleString("vi-VN") : "0"} <small className="text-muted" style={{ fontSize: "0.8rem" }}>đ/người</small>
                        </span>
                      </div>
                      <Link
                        to={`/tours/${tour.id}`}
                        className="btn btn-primary rounded-pill px-3 py-2 fw-semibold"
                        style={{
                          background: "var(--primary)",
                          border: "none",
                          fontSize: "0.85rem",
                          boxShadow: "var(--shadow-glow)"
                        }}
                      >
                        Khám phá
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. DANH SÁCH TẤT CẢ TOUR */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <span className="badge px-3 py-1 rounded-pill mb-1" style={{ background: "#e0e7ff", color: "#4338ca", fontWeight: "700" }}>
                🌍 TẤT CẢ ĐIỂM ĐẾN
              </span>
              <h3 className="fw-bold mb-0 text-dark" style={{ letterSpacing: "-0.5px" }}>Khám phá các hành trình mới</h3>
            </div>
          </div>

          {loading && <p className="text-muted">Đang cập nhật danh sách tour...</p>}
          {error && <p className="text-danger">{error}</p>}

          <div className="row g-4">
            {currentTours.map((tour) => (
              <div className="col-md-6 col-xl-4" key={tour.id}>
                <div className="card h-100 border-0 rounded-4 overflow-hidden bg-white shadow-sm" style={{
                  transition: "var(--transition-smooth)"
                }}>
                  <div className="position-relative overflow-hidden" style={{ height: "170px" }}>
                    <img
                      src={tour.image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"}
                      className="w-100 h-100"
                      alt={tour.title}
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1";
                      }}
                    />
                  </div>
                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center gap-1 text-muted small mb-1">
                        <i className="bi bi-geo-alt text-primary"></i>
                        <span>{tour.city || "Việt Nam"}</span>
                      </div>
                      <h6 className="card-title fw-bold text-dark text-truncate mb-3">{tour.title}</h6>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                      <span className="fw-bold text-primary">
                        {tour.price ? tour.price.toLocaleString("vi-VN") : "0"} đ
                      </span>
                      <Link to={`/tours/${tour.id}`} className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold">
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        {/* --- PHÂN TRANG HIỆN ĐẠI --- */}
        {totalPages > 1 && (
          <nav aria-label="Page navigation" className="mt-5 mb-4">
            <ul className="pagination justify-content-center gap-2">
              {/* Nút lùi */}
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link rounded-circle border-0 shadow-sm d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px", color: "var(--text-main)" }}
                  onClick={() => paginate(currentPage - 1)}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>
              
              {/* Các nút số */}
              {[...Array(totalPages)].map((_, index) => {
                const isAct = currentPage === index + 1;
                return (
                  <li key={index + 1} className="page-item">
                    <button
                      className="page-link rounded-circle border-0 shadow-sm fw-semibold d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: isAct ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "#fff",
                        color: isAct ? "#fff" : "var(--text-main)",
                        boxShadow: isAct ? "var(--shadow-glow)" : "var(--shadow-sm)"
                      }}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              })}

              {/* Nút tiến */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link rounded-circle border-0 shadow-sm d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px", color: "var(--text-main)" }}
                  onClick={() => paginate(currentPage + 1)}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        )}
          {/* Danh sách tất cả các khách sạn nổi bật*/}
          <HotelPage />
        </div>
        {/* Kết thúc cột phải */}
      </div>
      {/* Kết thúc row */}
    </div>
  );
};

export default Home;
