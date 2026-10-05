import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hotelService } from "../services/hotelService";
import { BASE_URL } from "../utils/config";

const FeaturedHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedHotels();
  }, []);

  const fetchFeaturedHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await hotelService.getFeatured({ page: 0, size: 3 });
      const pageData = res.data?.data;
      const list = pageData?.items || pageData || (Array.isArray(res.data) ? res.data : []);
      setHotels(Array.isArray(list) ? list.slice(0, 3) : []);
    } catch (err) {
      console.error("Lỗi kết nối API khách sạn nổi bật:", err);
      setError("Không thể kết nối đến Server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 mb-5">
      {/* 1. TIÊU ĐỀ, BADGE & NÚT XEM TẤT CẢ */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span
            className="badge px-3 py-1 rounded-pill mb-1"
            style={{ background: "#ecfdf5", color: "#047857", fontWeight: "700" }}
          >
            🏨 NƠI LƯU TRÚ LÝ TƯỞNG
          </span>
          <h3 className="fw-bold mb-0 text-dark" style={{ letterSpacing: "-0.5px" }}>
            Khách sạn & Chỗ nghỉ nổi bật
          </h3>
        </div>
        <Link
          to="/hotel"
          className="text-primary fw-semibold text-decoration-none d-flex align-items-center gap-1"
        >
          Xem tất cả <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      {/* 2. TRẠNG THÁI LOADING / ERROR */}
      {loading && <p className="text-muted">Đang cập nhật danh sách khách sạn nổi bật...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* 3. LƯỚI CARD KHÁCH SẠN NỔI BẬT */}
      {!loading && !error && hotels.length > 0 && (
        <div className="row g-4">
          {hotels.map((hotel) => (
            <div className="col-md-6 col-xl-4" key={hotel.id}>
              <div
                className="card h-100 rounded-4 overflow-hidden bg-white shadow-sm interactive-card"
                onClick={() => navigate(`/hotel/${hotel.id}`)}
              >
                <div className="position-relative overflow-hidden" style={{ height: "170px" }}>
                  <span
                    className="position-absolute top-0 end-0 m-2 badge px-2 py-1 rounded-pill fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                      color: "#fff",
                      zIndex: 2,
                      fontSize: "0.75rem"
                    }}
                  >
                    🔥 Hot
                  </span>
                  <img
                    src={
                      hotel.thumbnail_url
                        ? hotel.thumbnail_url.startsWith("http")
                          ? hotel.thumbnail_url
                          : `${BASE_URL}${hotel.thumbnail_url}`
                        : "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                    }
                    className="w-100 h-100 card-img-zoom"
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
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && hotels.length === 0 && (
        <p className="text-muted">Không tìm thấy khách sạn nào phù hợp.</p>
      )}
    </div>
  );
};

export default FeaturedHotels;
