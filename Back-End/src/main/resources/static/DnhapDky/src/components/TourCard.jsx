import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "../App.css"; // Import CSS

const TourCard = ({ tour }) => {
  const { id, title, city, image, price, featured } = tour;

  return (
    <div className="tour__card">
      <Card className="border-0 shadow-sm">
        <div className="tour__img position-relative">
          <img
            src={image}
            alt="tour-img"
            className="w-100 rounded-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
          {featured && (
            <span className="position-absolute top-0 end-0 bg-warning text-white px-2 py-1 m-2 rounded">
              Featured
            </span>
          )}
        </div>

        <CardBody>
          <div className="d-flex align-items-center justify-content-between mb-2 text-muted">
            <span className="d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i> {city}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-star-fill text-warning"></i> 5.0
            </span>
          </div>

          <h5 className="tour__title mb-3">
            <Link
              to={`/tours/${id}`}
              className="text-decoration-none text-dark"
            >
              {title}
            </Link>
          </h5>

          <div className="d-flex align-items-center justify-content-between mt-3">
            <h5 className="text-primary fw-bold">
              ${price} <span className="text-muted fs-6 fw-normal">/người</span>
            </h5>
            <button className="btn booking__btn">
              <Link
                to={`/tours/${id}`}
                className="text-white text-decoration-none"
              >
                Đặt Ngay
              </Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default TourCard;
