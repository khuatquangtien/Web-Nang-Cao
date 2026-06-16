import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "../App.css"; // Để sử dụng CSS chung

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;

  // Tính điểm đánh giá trung bình
  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
  const avgRating =
    totalRating === 0
      ? ""
      : totalRating === 1
        ? totalRating
        : (totalRating / reviews?.length).toFixed(1);

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          {/* Hiển thị ảnh tour */}
          <img src={photo} alt="tour-img" />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="bi bi-geo-alt"></i> {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i
                className="bi bi-star-fill"
                style={{ color: "var(--secondary-color)" }}
              ></i>
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                "Not rated"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
              <span> /người</span>
            </h5>

            <button className="btn booking__btn">
              <Link to={`/tours/${_id}`}>Đặt ngay</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
