import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // --- 1. Các hàm hỗ trợ hiển thị đẹp ---
  
  // Format tiền tệ (VND)
  const formatCurrency = (price) => {
    if (!price) return "0 đ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Format ngày tháng (dd/mm/yyyy)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  // Màu sắc cho từng trạng thái (Badge)
  const getStatusBadge = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "badge bg-success"; // Xanh lá
      case "PENDING":
        return "badge bg-warning text-dark"; // Vàng
      case "CANCELLED":
        return "badge bg-danger"; // Đỏ
      default:
        return "badge bg-secondary"; // Xám
    }
  };

  // --- 2. Gọi API lấy dữ liệu ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
        // Chưa đăng nhập thì đuổi về login hoặc thông báo
        return; 
    }

    const userObj = JSON.parse(storedUser);
    const userId = userObj.id || userObj.user?.id;

    if (userId) {
      // Gọi API lấy danh sách
      axios
        .get(`http://localhost:9090/bookings/user/${userId}`)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => {
          console.error("Lỗi lấy lịch sử:", err);
        });
    }
  }, []);

  // --- 3. Giao diện (Render) ---
  return (
    <div className="container py-5" style={{ backgroundColor: "#f2f4f6", minHeight: "70vh", padding: "50px 30px" }} >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-luggage-fill me-2"></i>Chuyến đi của tôi
        </h2>
        <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
          <i className="bi bi-plus-lg"></i> Đặt thêm tour
        </button>
      </div>

      <div className="row g-4">
        {bookings.length === 0 ? (
          <div className="col-12 text-center py-5 bg-light rounded-3">
            <h4 className="text-muted">Bạn chưa có chuyến đi nào!</h4>
            <p>Hãy khám phá các tour hấp dẫn ngay hôm nay.</p>
          </div>
        ) : (
          bookings.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden booking-card">
                
                {/* Header: Trạng thái & Mã đơn */}
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-3 px-3">
                  <small className="text-muted fw-bold">#{item.id}</small>
                  <span className={getStatusBadge(item.status)} style={{ fontSize: "0.8rem" }}>
                    {item.status}
                  </span>
                </div>

                {/* Body: Thông tin chính */}
                <div className="card-body">
                  {/* Tên Tour */}
                  <h5 className="card-title fw-bold text-dark mb-3" 
                      style={{ minHeight: "3rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.tour?.title || "Tour không xác định"}
                  </h5>

                  {/* Chi tiết: Ngày & Số người */}
                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span><i className="bi bi-calendar-event me-1"></i> Khởi hành:</span>
                    <span className="fw-bold text-dark">{formatDate(item.bookingDate)}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span><i className="bi bi-people me-1"></i> Số khách:</span>
                    <span className="fw-bold text-dark">{item.numPeople} người</span>
                  </div>

                  <hr className="my-3 text-secondary opacity-25" />

                  {/* Tổng tiền */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">Tổng thanh toán</span>
                    <span className="fs-5 fw-bold text-danger">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Footer: Nút bấm */}
                <div className="card-footer bg-light border-0 p-3">
                  <button className="btn btn-primary w-100 rounded-pill btn-sm fw-bold">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;