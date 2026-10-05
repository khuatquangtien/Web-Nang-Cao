import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hotelService } from "../../services/hotelService";
import BackButton from "../../components/common/BackButton";
import Pagination from "../../components/common/Pagination";
import { BASE_URL } from "../../utils/config";

const HotelPage = () => {
  const [hotels, setHotels] = useState([]); // Danh sách toàn bộ khách sạn
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- LOGIC PHÂN TRANG KHÁCH SẠN BACKEND ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const hotelsPerPage = 6; // 6 khách sạn (2 hàng x 3 cột)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 1. Tự động gọi API lấy khách sạn theo trang
  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchAllHotels(currentPage);
    }
  }, [currentPage]);

  const fetchAllHotels = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await hotelService.getAll({ page: page - 1, size: hotelsPerPage });
      const pageData = res.data?.data;
      if (pageData && pageData.items) {
        setHotels(pageData.items);
        setTotalPages(pageData.totalPages || 1);
      } else if (Array.isArray(pageData)) {
        setHotels(pageData);
        setTotalPages(1);
      } else if (Array.isArray(res.data)) {
        setHotels(res.data);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Lỗi kết nối API lấy danh sách khách sạn:", err);
      setError("Không thể kết nối đến Server!");
    } finally {
      setLoading(false);
    }
  };

  // 2. Tìm kiếm khách sạn theo từ khóa
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setCurrentPage(1);
      fetchAllHotels(1);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await hotelService.search(searchQuery.trim());
      const list = res.data?.data || res.data || [];
      setHotels(Array.isArray(list) ? list : []);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (err) {
      console.error("Lỗi kết nối API tìm kiếm:", err);
      setError("Không thể kết nối đến Server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      {/* 0. NÚT QUAY LẠI TIÊU CHUẨN */}
      <div className="mb-3">
        <BackButton label="Quay lại" fallback="/home" />
      </div>

      {/* 1. THANH TÌM KIẾM KHÁCH SẠN */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white">
        <form onSubmit={handleSearch} className="row g-3 align-items-center">
          <div className="col-md-9">
            <div className="input-group">
              <span className="input-group-text bg-light border-0 text-muted ps-3">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-0 py-2"
                placeholder="Tìm khách sạn theo tên, địa điểm, thành phố..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 rounded-pill fw-semibold"
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                border: "none",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>

      {/* 2. TIÊU ĐỀ & BADGE */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span
            className="badge px-3 py-1 rounded-pill mb-1"
            style={{ background: "#ecfdf5", color: "#047857", fontWeight: "700" }}
          >
            🏨 TẤT CẢ ĐIỂM NGHỈ DƯỠNG
          </span>
          <h3 className="fw-bold mb-0 text-dark" style={{ letterSpacing: "-0.5px" }}>
            {searchQuery
              ? `Kết quả tìm kiếm cho "${searchQuery}" (${hotels.length})`
              : "Danh sách tất cả khách sạn & chỗ nghỉ"}
          </h3>
        </div>
      </div>

      {/* 3. TRẠNG THÁI LOADING / ERROR */}
      {loading && <p className="text-muted">Đang tải danh sách khách sạn...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* 4. LƯỚI CARD KHÁCH SẠN */}
      {!loading && !error && hotels.length > 0 && (
        <>
          <div className="row g-4">
            {hotels.map((hotel) => (
              <div className="col-md-6 col-xl-4" key={hotel.id}>
                <div
                  className="card h-100 border-0 rounded-4 overflow-hidden bg-white shadow-sm"
                  style={{
                    transition: "var(--transition-smooth, all 0.3s ease)",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`/hotel/${hotel.id}`)}
                >
                  <div className="position-relative overflow-hidden" style={{ height: "180px" }}>
                    {hotel.is_active && (
                      <span
                        className="position-absolute top-0 end-0 m-2 badge px-2 py-1 rounded-pill fw-bold"
                        style={{
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          color: "#fff",
                          zIndex: 2,
                          fontSize: "0.75rem"
                        }}
                      >
                        Đang hoạt động
                      </span>
                    )}
                    <img
                      src={
                        hotel.thumbnail_url
                          ? hotel.thumbnail_url.startsWith("http")
                            ? hotel.thumbnail_url
                            : `${BASE_URL}${hotel.thumbnail_url}`
                          : "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                      }
                      className="w-100 h-100"
                      alt={hotel.name}
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945";
                      }}
                    />
                  </div>

                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between text-muted small mb-1">
                        <div className="d-flex align-items-center gap-1 text-truncate" style={{ maxWidth: "70%" }}>
                          <i className="bi bi-geo-alt text-primary"></i>
                          <span className="text-truncate">{hotel.address || "Việt Nam"}</span>
                        </div>
                        {hotel.averageRating && (
                          <span className="fw-semibold text-warning d-flex align-items-center gap-1">
                            ⭐ {hotel.averageRating.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <h6 className="card-title fw-bold text-dark text-truncate mb-3">{hotel.name}</h6>
                    </div>

                    <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                      <div>
                        <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Giá chỉ từ</small>
                        <span className="fw-bold text-primary">
                          {hotel.min_price ? `${hotel.min_price.toLocaleString("vi-VN")} đ` : "Liên hệ"}
                        </span>
                      </div>
                      <button className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 5. PHÂN TRANG DÙNG CHUNG */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
            scrollTo={100}
          />
        </>
      )}

      {!loading && !error && hotels.length === 0 && (
        <p className="text-muted">Không tìm thấy khách sạn nào phù hợp.</p>
      )}
    </div>
  );
};

export default HotelPage;
