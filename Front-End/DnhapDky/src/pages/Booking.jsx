import React, { useState } from "react";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import '../styles/booking.css';
import { BASE_URL } from "../utils/config"; 

const Booking = ({ tour, avgRating }) => {
  // Lấy các thông tin cần thiết từ props tour
  const { price, reviews, title, id } = tour || {}; 
  const navigate = useNavigate();

  // State lưu thông tin người dùng nhập
  const [credentials, setCredentials] = useState({
    userId: "user_01", // Mặc định, sẽ được ghi đè nếu user đã login
    userEmail: "example@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  // Tính tổng tiền: (Giá * Số người) + Phí
  const totalAmount = (Number(price) || 0) * (Number(credentials.guestSize) || 1) + serviceFee;

  // --- HÀM GỬI DỮ LIỆU ---
  const handleClick = async (e) => {
    e.preventDefault();

    // 1. Lấy user từ localStorage
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      alert("Vui lòng đăng nhập để đặt tour!");
      navigate("/login");
      return;
    }

    // 2. Validate dữ liệu
    if (credentials.fullName === "" || credentials.phone === "" || credentials.bookAt === "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // 3. Tạo Object gửi về Backend (ĐÃ CHUẨN HÓA)
    const bookingInfo = {
      // --- SỬA LỖI USER ---
      // Java yêu cầu object User, không phải userId rời rạc
      user: {
          id: user.id || user._id || user.userId // Lấy ID của user đang đăng nhập
      },

      // --- SỬA LỖI TOUR ---
      tour: {
          id: id // Lấy ID của tour hiện tại
      },
      
      // --- SỬA LỖI TÊN BIẾN ---
      // React đang là guestSize -> Đổi thành numPeople cho khớp Java
      numPeople: Number(credentials.guestSize), 
      
      // React đang là bookAt -> Đổi thành bookingDate cho khớp Java
      bookingDate: credentials.bookAt,
      
      // Gửi thêm tổng tiền (vì trong Java bạn có trường totalPrice)
      totalPrice: totalAmount,
      
      status: "PENDING" // Gửi thêm trạng thái (tùy chọn, vì backend có set mặc định rồi)
    };

    console.log("Dữ liệu gửi đi:", bookingInfo); 

    try {
      const res = await fetch(`${BASE_URL}/bookings`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${user.token}` // Bỏ comment nếu có dùng token
        },
        body: JSON.stringify(bookingInfo),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Có lỗi xảy ra khi đặt tour!");
      } else {
        alert("Đặt tour thành công!");
        navigate("/thank-you");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối Server: " + err.message);
    }
  };

  
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/người</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="bi bi-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ================= FORM ================= */}
      <div className="booking__form">
        <h5>Thông tin đặt chỗ</h5>
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
              min="1"
              // Giới hạn số người tối đa theo tour (nếu có)
              max={tour?.maxGroupSize || 99}
              defaultValue={1}
              onChange={handleChange}
              className="form-control"
            />
          </FormGroup>
        </Form>
      </div>

      {/* ================= TOTAL & BUTTON ================= */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0 d-flex justify-content-between">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="bi bi-x-lg"></i> {credentials.guestSize} người
            </h5>
            <span>${(Number(price) * Number(credentials.guestSize)).toLocaleString()}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 d-flex justify-content-between">
            <h5>Phí dịch vụ</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total d-flex justify-content-between">
            <h5>Tổng cộng</h5>
            <span>${totalAmount.toLocaleString()}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          ĐẶT NGAY VÉ NÀY
        </Button>
      </div>
    </div>
  );
};

export default Booking;