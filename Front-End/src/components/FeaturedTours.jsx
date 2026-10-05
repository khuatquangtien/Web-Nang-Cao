import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tourService } from "../services/tourService";

const FeaturedTours = () => {
  const [toursFeatured, setToursFeatured] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  // Logic gọi API lấy tour nổi bật
  useEffect(() => {
    tourService
      .getFeatured({ page: 0, size: 3 })
      .then((res) => {
        const data = res.data?.data?.items || res.data?.data || [];
        setToursFeatured(Array.isArray(data) ? data.slice(0, 3) : []);
        setLoadingFeatured(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorFeatured("Không thể kết nối đến Server!");
        setLoadingFeatured(false);
      });
  }, []);

  return (
    <div className="mb-5">
      {/* TIÊU ĐỀ & BADGE TOUR NỔI BẬT */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span
            className="badge px-3 py-1 rounded-pill mb-1"
            style={{ background: "#fef3c7", color: "#d97706", fontWeight: "700" }}
          >
            🌟 LỰA CHỌN HÀNG ĐẦU
          </span>
          <h3 className="fw-bold mb-0 text-dark" style={{ letterSpacing: "-0.5px" }}>
            Tour du lịch nổi bật
          </h3>
        </div>
        <Link
          to="/tours"
          className="text-primary fw-semibold text-decoration-none d-flex align-items-center gap-1"
        >
          Xem tất cả <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      {/* TRẠNG THÁI LOADING / ERROR */}
      {loadingFeatured && (
        <p className="text-muted">Đang tải những trải nghiệm tuyệt vời nhất...</p>
      )}
      {errorFeatured && <p className="text-danger">{errorFeatured}</p>}

      {/* DANH SÁCH TOUR NỔI BẬT (CHỈ HIỂN THỊ 3 TOUR TRÊN 1 HÀNG) */}
      {!loadingFeatured && !errorFeatured && (
        <div className="row g-4">
          {toursFeatured.slice(0, 3).map((tour) => (
            <div className="col-md-6 col-xl-4" key={tour.id}>
              <Link
                to={`/tours/${tour.id}`}
                className="card h-100 rounded-4 overflow-hidden shadow-sm bg-white interactive-card text-decoration-none"
                style={{
                  boxShadow: "var(--shadow-md)"
                }}
              >
                <div
                  className="position-relative overflow-hidden"
                  style={{ height: "210px" }}
                >
                  <span
                    className="position-absolute top-0 start-0 m-3 badge px-3 py-2 rounded-pill fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 10px rgba(239, 68, 68, 0.4)",
                      zIndex: 2
                    }}
                  >
                    🔥 Nổi bật
                  </span>
                  <img
                    src={
                      tour.image ||
                      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                    }
                    className="w-100 h-100 card-img-zoom"
                    alt={tour.title}
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
                    }}
                  />
                </div>
                <div className="card-body p-3 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                      <i className="bi bi-geo-alt text-primary"></i>
                      <span>{tour.city || "Việt Nam"}</span>
                    </div>
                    <h5
                      className="card-title fw-bold text-dark mb-3 text-truncate"
                      style={{ fontSize: "1.05rem", lineHeight: "1.4" }}
                    >
                      {tour.title}
                    </h5>
                  </div>

                  <div className="pt-2 border-top mt-auto">
                    <span className="text-muted small d-block" style={{ fontSize: "0.75rem", lineHeight: 1.2 }}>
                      Giá chỉ từ
                    </span>
                    <div className="d-flex align-items-baseline gap-1 mt-1 text-nowrap">
                      <span className="fw-bold text-primary fs-5" style={{ letterSpacing: "-0.5px" }}>
                        {tour.price ? tour.price.toLocaleString("vi-VN") : "0"}
                      </span>
                      <span className="text-muted fw-normal" style={{ fontSize: "0.85rem" }}>
                        đ/người
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedTours;
