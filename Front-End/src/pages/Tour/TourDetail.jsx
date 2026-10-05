import React, { useState, useEffect } from "react";
import "../../App.css";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { tourService } from "../../services/tourService";
import BackButton from "../../components/common/BackButton";
import Booking from "../booking/Booking"; 

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourDetail = async () => {
      setLoading(true);
      try {
        const res = await tourService.getById(id);
        const data = res.data?.data ? res.data.data : res.data;
        setTour(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTourDetail();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <h4 className="text-center pt-5">Đang tải...</h4>;
  if (error) return <h4 className="text-center pt-5 text-danger">Lỗi: {error}</h4>;
  if (!tour) return <h4 className="text-center pt-5">Không tìm thấy tour!</h4>;

  const {
    image,
    title,
    description,
    price,
    address,
    city,
    distance,
    maxGroupSize,
    reviews
  } = tour;

  const formatPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0) || 0;
  const avgRating =
    totalRating === 0
      ? ""
      : totalRating === 1
        ? totalRating
        : (totalRating / reviews?.length).toFixed(1);

  return (
    <section className="pt-4 pb-5">
      <Container>
        <div className="mb-3">
          <BackButton label="Quay lại danh sách tour" fallback="/tours" />
        </div>
        <Row>
          <Col lg="8">
            <div className="card border-0 p-4 rounded-4 bg-white shadow-sm mb-4 mb-lg-0">
              <img
                src={image} 
                alt={title}
                className="w-100 rounded-4 mb-4 shadow-sm"
                style={{ maxHeight: "420px", objectFit: "cover" }}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"; }}
              />

              <div className="tour__info">
                <h2 className="fw-bold text-dark mb-2" style={{ letterSpacing: "-0.5px" }}>{title}</h2>
                <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                  <span className="badge px-3 py-2 rounded-pill d-flex align-items-center gap-1.5 fw-semibold border" style={{ background: "#fffbeb", borderColor: "#fef3c7", color: "#b45309" }}>
                    <i className="bi bi-star-fill text-warning"></i>{" "}
                    {avgRating || "5.0"}{" "}
                    {reviews?.length ? `(${reviews.length} đánh giá)` : "(Chưa có đánh giá)"}
                  </span>
                  <span className="text-secondary small d-flex align-items-center gap-1">
                    <i className="bi bi-geo-alt-fill text-danger"></i> {address || city}
                  </span>
                </div>

                {/* 4 Feature Chips */}
                <div className="row g-2 mb-4">
                  <div className="col-6 col-md-3">
                    <div className="p-3 bg-light rounded-3 text-center border">
                      <i className="bi bi-geo-alt-fill text-primary fs-4 d-block mb-1"></i>
                      <small className="text-muted d-block" style={{ fontSize: "11px" }}>Điểm đến</small>
                      <strong className="text-dark small text-truncate d-block">{city || address}</strong>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="p-3 bg-light rounded-3 text-center border">
                      <i className="bi bi-cash-stack text-success fs-4 d-block mb-1"></i>
                      <small className="text-muted d-block" style={{ fontSize: "11px" }}>Giá vé</small>
                      <strong className="text-dark small text-truncate d-block">{formatPrice}</strong>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="p-3 bg-light rounded-3 text-center border">
                      <i className="bi bi-signpost-2 text-warning fs-4 d-block mb-1"></i>
                      <small className="text-muted d-block" style={{ fontSize: "11px" }}>Khoảng cách</small>
                      <strong className="text-dark small text-truncate d-block">{distance || "0"} km</strong>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="p-3 bg-light rounded-3 text-center border">
                      <i className="bi bi-people-fill text-info fs-4 d-block mb-1"></i>
                      <small className="text-muted d-block" style={{ fontSize: "11px" }}>Đoàn tối đa</small>
                      <strong className="text-dark small text-truncate d-block">{maxGroupSize || 30} người</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-top">
                  <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-file-text-fill text-primary"></i> Mô tả chuyến đi
                  </h5>
                  <p className="text-secondary" style={{ lineHeight: "1.9", fontSize: "0.98rem" }}>
                    {description || "Chưa có mô tả chi tiết cho tour này."}
                  </p>
                </div>
              </div>
            </div>
          </Col>

          {/* Form đặt tour nằm ở bên phải */}
          <Col lg="4">
            <Booking tour={tour} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetail;
