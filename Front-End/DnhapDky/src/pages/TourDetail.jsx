import React, { useState, useEffect } from "react";
import "../App.css";
import { Container, Row, Col, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import Booking from "./Booking"; 

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/tours/${id}`);
        // Xử lý dữ liệu trả về từ Spring Boot (thường là res.data)
        setTour(res.data.data ? res.data.data : res.data);
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

  // --- SỬA LẠI TÊN BIẾN Ở ĐÂY CHO KHỚP DATABASE ---
  const {
    image,        // Cũ là photo -> Database là image
    title,
    description,  // Cũ là desc -> Database là description
    price,
    address,
    city,
    distance,
    maxGroupSize, // Backend Java thường tự map max_group_size -> maxGroupSize
    reviews,
  } = tour;

  // Format giá tiền Việt Nam
  const formatPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  // Tính điểm đánh giá
  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0) || 0;
  const avgRating =
    totalRating === 0
      ? ""
      : totalRating === 1
        ? totalRating
        : (totalRating / reviews?.length).toFixed(1);

  return (
    <section className="pt-4">
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content border p-4 rounded bg-white shadow-sm">
              {/* SỬA: Dùng biến image thay vì photo */}
              <img
                src={image} 
                alt={title}
                className="w-100 rounded mb-4"
                style={{ maxHeight: "400px", objectFit: "cover" }}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/700x400?text=No+Image"; }} // Ảnh dự phòng nếu link hỏng
              />

              <div className="tour__info">
                <h2>{title}</h2>
                <div className="d-flex align-items-center gap-5 mt-3 mb-4">
                  <span className="d-flex align-items-center gap-1">
                    <i className="bi bi-star-fill text-warning"></i>{" "}
                    {avgRating || "Chưa có đánh giá"}
                  </span>
                  <span>
                    <i className="bi bi-geo-alt-fill text-danger"></i> {address}
                  </span>
                </div>

                <div className="tour__extra-details d-flex flex-wrap gap-4 mb-4">
                  <span><i className="bi bi-geo-alt"></i> {city}</span>
                  <span><i className="bi bi-cash-stack"></i> {formatPrice}</span>
                  <span><i className="bi bi-people"></i> Tối đa {maxGroupSize} người</span>
                  <span><i className="bi bi-map"></i> {distance} km</span>
                </div>

                <h5>Mô tả chuyến đi</h5>
                {/* SỬA: Dùng biến description thay vì desc */}
                <p className="text-muted">{description}</p>
              </div>

              {/* Phần Reviews */}
              <div className="tour__reviews mt-5 pt-4 border-top">
                <h4>Đánh giá ({reviews?.length || 0} reviews)</h4>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <div className="rating__group d-flex gap-3 mb-3 fs-4 text-warning cursor-pointer">
                     {[1, 2, 3, 4, 5].map(star => (
                        <i key={star} className="bi bi-star" onClick={() => alert(`${star} sao`)}></i>
                     ))}
                  </div>
                  <div className="review__input d-flex align-items-center justify-content-between bg-light p-2 rounded-pill border">
                    <input type="text" placeholder="Chia sẻ cảm nghĩ..." className="bg-transparent border-0 w-100 px-3" style={{ outline: "none" }} />
                    <button className="btn btn-warning text-white rounded-pill" type="submit">Gửi</button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>

          <Col lg="4">
            <Booking tour={tour} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetail;