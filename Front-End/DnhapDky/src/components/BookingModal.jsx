import React, { useState } from "react";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../App.css"; // CSS chung

const BookingModal = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userId: "01", // Tạm thời hardcode, sau này lấy từ AuthContext
    userEmail: "example@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Phí dịch vụ (ví dụ 10%)
  const serviceFee = 100000;
  const totalAmount =
    Number(price) * Number(credentials.guestSize) + serviceFee;

  const handleClick = (e) => {
    e.preventDefault();
    // Sau này sẽ gọi API booking ở đây
    console.log("Booking info:", credentials);
    alert("Đặt tour thành công! (Demo)");
    navigate("/thank-you");
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
          <span>/người</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i
            className="bi bi-star-fill"
            style={{ color: "var(--secondary-color)" }}
          ></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* === FORM NHẬP LIỆU === */}
      <div className="booking__form">
        <h5>Thông tin của bạn</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Họ và tên"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Số điện thoại"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              required
              onChange={handleChange}
              className="form-control"
            />
            <input
              type="number"
              placeholder="Số khách"
              id="guestSize"
              required
              onChange={handleChange}
              className="form-control"
              min="1"
            />
          </FormGroup>
        </Form>
      </div>

      {/* === TÓM TẮT HÓA ĐƠN === */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0 booking__list-item">
            <h5 className="d-flex align-items-center gap-1">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
              <i className="bi bi-x"></i> 1 người
            </h5>
            <span>
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 booking__list-item">
            <h5>Phí dịch vụ</h5>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(serviceFee)}
            </span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total booking__list-item">
            <h5>Tổng cộng</h5>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalAmount)}
            </span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Đặt Ngay
        </Button>
      </div>
    </div>
  );
};

export default BookingModal;
