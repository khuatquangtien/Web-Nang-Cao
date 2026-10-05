import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tourService } from "../services/tourService";
import Pagination from "./common/Pagination";

const AllTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- LOGIC PHÂN TRANG TOUR BACKEND ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toursPerPage = 6;

  useEffect(() => {
    setLoading(true);
    tourService
      .getAll({ page: currentPage - 1, size: toursPerPage })
      .then((res) => {
        const pageData = res.data?.data;
        if (pageData && pageData.items) {
          setTours(pageData.items);
          setTotalPages(pageData.totalPages || 1);
        } else if (Array.isArray(res.data)) {
          setTours(res.data);
          setTotalPages(1);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Không thể kết nối đến Server!");
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <div className="mb-5">
      {/* TIÊU ĐỀ & BADGE TẤT CẢ TOUR */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span
            className="badge px-3 py-1 rounded-pill mb-1"
            style={{ background: "#e0e7ff", color: "#4338ca", fontWeight: "700" }}
          >
            🌍 TẤT CẢ ĐIỂM ĐẾN
          </span>
          <h3 className="fw-bold mb-0 text-dark" style={{ letterSpacing: "-0.5px" }}>
            Khám phá các hành trình mới
          </h3>
        </div>
      </div>

      {loading && <p className="text-muted">Đang cập nhật danh sách tour...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && tours.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p>Hiện chưa có tour nào.</p>
        </div>
      )}
      {!loading && !error && tours.length > 0 && (
        <>
          <div className="row g-4">
            {tours.map((tour) => (
              <div className="col-md-6 col-xl-4" key={tour.id}>
                <Link
                  to={`/tours/${tour.id}`}
                  className="card h-100 rounded-4 overflow-hidden bg-white shadow-sm interactive-card text-decoration-none"
                >
                  <div className="position-relative overflow-hidden" style={{ height: "170px" }}>
                    <img
                      src={
                        tour.image ||
                        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
                      }
                      className="w-100 h-100 card-img-zoom"
                      alt={tour.title}
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1";
                      }}
                    />
                  </div>
                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center gap-1 text-muted small mb-1">
                        <i className="bi bi-geo-alt text-primary"></i>
                        <span>{tour.city || "Việt Nam"}</span>
                      </div>
                      <h6 className="card-title fw-bold text-dark text-truncate mb-3">
                        {tour.title}
                      </h6>
                    </div>
                    <div className="pt-2 border-top mt-auto">
                      <div className="d-flex align-items-baseline gap-1 text-nowrap">
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

          {/* PHÂN TRANG DÙNG CHUNG */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            scrollTo={400}
          />
        </>
      )}
    </div>
  );
};

export default AllTours;
