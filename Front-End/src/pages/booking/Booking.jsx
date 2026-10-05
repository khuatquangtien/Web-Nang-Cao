import React, { useState, useEffect } from "react";
import { Form } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/booking.css";
import apiClient from "../../services/apiClient";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, id, maxGroupSize } = tour || {};
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [credentials, setCredentials] = useState({
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
    note: "",
  });

  // Tự động điền thông tin nếu người dùng đã đăng nhập
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setCredentials((prev) => ({
          ...prev,
          fullName: user.fullName || user.username || "",
          phone: user.phone || "",
        }));
      } catch (e) {
        console.error("Lỗi đọc thông tin user từ localStorage", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleGuestChange = (delta) => {
    const current = Number(credentials.guestSize) || 1;
    const max = maxGroupSize || 50;
    const next = Math.max(1, Math.min(max, current + delta));
    setCredentials((prev) => ({ ...prev, guestSize: next }));
  };

  const numericPrice = Number(price) || 0;
  const guestCount = Number(credentials.guestSize) || 1;
  const subTotal = numericPrice * guestCount;
  const serviceFee = 0; // Miễn phí dịch vụ hoặc phí cố định
  const totalAmount = subTotal + serviceFee;

  // Lấy ngày hiện tại làm ngày tối thiểu có thể đặt
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      alert("Vui lòng đăng nhập để tiến hành đặt tour!");
      navigate("/login");
      return;
    }

    if (!credentials.fullName.trim() || !credentials.phone.trim() || !credentials.bookAt) {
      alert("Vui lòng điền đầy đủ thông tin đặt tour!");
      return;
    }

    setLoadingSubmit(true);

    // Chuẩn hóa dữ liệu theo chuẩn BookingTourRequest của Backend
    const bookingPayload = {
      tourId: Number(id),
      numPeople: guestCount,
      bookingDate: credentials.bookAt,
      customerName: credentials.fullName.trim(),
      customerPhone: credentials.phone.trim(),
      note: credentials.note ? credentials.note.trim() : "",
      user: { id: user.id || user.userId },
      tour: { id: Number(id) },
      totalPrice: totalAmount,
      status: "PENDING",
    };

    try {
      // Dùng apiClient tự động đính kèm Bearer JWT Token
      const res = await apiClient.post("/bookings/tour", bookingPayload);

      if (res.data) {
        alert("🎉 Đặt tour thành công! Chúng tôi đã gửi email xác nhận cho bạn.");
        navigate("/thank-you");
      }
    } catch (err) {
      console.warn("Lỗi gửi qua apiClient, thử gọi fetch dự phòng:", err);
      // Fallback bằng fetch nếu apiClient gặp sự cố
      try {
        const token = localStorage.getItem("token");
        const fallbackRes = await fetch(`${BASE_URL}/bookings/tour`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(bookingPayload),
        });

        const result = await fallbackRes.json();
        if (fallbackRes.ok) {
          alert("🎉 Đặt tour thành công!");
          navigate("/thank-you");
        } else {
          alert(result.message || "Có lỗi xảy ra khi đặt tour!");
        }
      } catch (fallbackErr) {
        alert("Lỗi kết nối Server: " + (err.response?.data?.message || err.message));
      }
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="booking-card sticky-top" style={{ top: "100px", zIndex: 10 }}>
      {/* 1. Header giá & đánh giá */}
      <div className="d-flex align-items-baseline justify-content-between mb-3 pb-3 border-bottom">
        <div>
          <span className="text-muted small d-block mb-1">Giá mỗi khách</span>
          <div className="d-flex align-items-baseline gap-1">
            <span className="fw-bold text-primary fs-3" style={{ letterSpacing: "-0.5px" }}>
              {numericPrice.toLocaleString("vi-VN")} đ
            </span>
            <span className="text-muted fw-normal fs-6">/ người</span>
          </div>
        </div>
        <div
          className="px-2.5 py-1 rounded-pill d-flex align-items-center gap-1 border"
          style={{ background: "#fffbeb", borderColor: "#fef3c7" }}
        >
          <i className="bi bi-star-fill text-warning" style={{ fontSize: "0.85rem" }}></i>
          <span className="fw-bold text-dark small">{avgRating || "5.0"}</span>
          <span className="text-muted small">({reviews?.length || 0})</span>
        </div>
      </div>

      {/* 2. Form nhập thông tin */}
      <div className="booking__form mb-3">
        <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-person-lines-fill text-primary"></i>
          <span>Thông tin đặt chỗ</span>
        </h6>

        <Form onSubmit={handleSubmit} className="booking-input-group">
          {/* Họ và tên */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary mb-1">
              Họ và tên <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                id="fullName"
                className="form-control with-addon"
                placeholder="Nhập họ và tên của bạn"
                value={credentials.fullName}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Số điện thoại */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary mb-1">
              Số điện thoại <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-telephone"></i>
              </span>
              <input
                type="tel"
                id="phone"
                className="form-control with-addon"
                placeholder="Ví dụ: 0912345678"
                value={credentials.phone}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Ngày khởi hành & Số lượng khách */}
          <div className="row g-2 mb-3">
            <div className="col-7">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Ngày đi <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <input
                  type="date"
                  id="bookAt"
                  min={today}
                  className="form-control with-addon"
                  value={credentials.bookAt}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-5">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Số người <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm px-2 py-2"
                  style={{ borderRadius: "12px 0 0 12px", border: "1.5px solid #e2e8f0" }}
                  onClick={() => handleGuestChange(-1)}
                  disabled={guestCount <= 1}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <input
                  type="number"
                  id="guestSize"
                  min="1"
                  max={maxGroupSize || 50}
                  className="form-control text-center py-2 border-start-0 border-end-0"
                  style={{ borderRadius: "0", borderTop: "1.5px solid #e2e8f0", borderBottom: "1.5px solid #e2e8f0" }}
                  value={credentials.guestSize}
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm px-2 py-2"
                  style={{ borderRadius: "0 12px 12px 0", border: "1.5px solid #e2e8f0" }}
                  onClick={() => handleGuestChange(1)}
                  disabled={guestCount >= (maxGroupSize || 50)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Ghi chú */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary mb-1">
              Ghi chú thêm
            </label>
            <textarea
              id="note"
              rows="2"
              className="form-control"
              placeholder="Yêu cầu đặc biệt (đón tận nơi, ăn chay, số ghế...)"
              value={credentials.note}
              onChange={handleChange}
              style={{ borderRadius: "12px", border: "1.5px solid #e2e8f0", fontSize: "0.9rem" }}
            ></textarea>
          </div>

          {/* 3. Tóm tắt chi phí (Chi tiết hóa đơn) */}
          <div className="booking-summary-box mb-3">
            <div className="d-flex justify-content-between text-secondary small mb-2">
              <span>
                {numericPrice.toLocaleString("vi-VN")} đ × {guestCount} khách
              </span>
              <span className="fw-semibold text-dark">{subTotal.toLocaleString("vi-VN")} đ</span>
            </div>

            <div className="d-flex justify-content-between text-secondary small mb-2">
              <span className="d-flex align-items-center gap-1">
                Phí bảo hiểm & dịch vụ
                <i className="bi bi-shield-check text-success" title="Đã bao gồm bảo hiểm du lịch"></i>
              </span>
              <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-0.5">
                Miễn phí
              </span>
            </div>

            <div className="border-top pt-2 mt-2 d-flex justify-content-between align-items-baseline">
              <div>
                <span className="fw-bold text-dark d-block">Tổng cộng</span>
                <small className="text-muted" style={{ fontSize: "11px" }}>
                  Đã bao gồm thuế & phí
                </small>
              </div>
              <span className="fw-bold text-primary fs-4" style={{ letterSpacing: "-0.5px" }}>
                {totalAmount.toLocaleString("vi-VN")} đ
              </span>
            </div>
          </div>

          {/* 4. Nút bấm CTA */}
          <button
            type="submit"
            disabled={loadingSubmit}
            className="btn-book-tour"
          >
            {loadingSubmit ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <i className="bi bi-lightning-charge-fill text-warning"></i>
                <span>ĐẶT NGAY VÉ NÀY</span>
              </>
            )}
          </button>
        </Form>
      </div>

      {/* 5. Cam kết tin cậy */}
      <div className="text-center text-muted pt-2 border-top" style={{ fontSize: "12px" }}>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <span className="d-flex align-items-center gap-1">
            <i className="bi bi-shield-check text-success"></i> Bảo mật 100%
          </span>
          <span>•</span>
          <span className="d-flex align-items-center gap-1">
            <i className="bi bi-envelope-check text-primary"></i> Vé gửi qua Email
          </span>
        </div>
      </div>
    </div>
  );
};

export default Booking;
