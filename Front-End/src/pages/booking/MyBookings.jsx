import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import BackButton from "../../components/common/BackButton";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

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
        return "badge bg-success";
      case "PENDING":
        return "badge bg-warning text-dark";
      case "CANCELLED":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return; 
    }

    const userObj = JSON.parse(storedUser);
    const userId = userObj.id || userObj.user?.id;

    if (userId) {
      apiClient
        .get(`/bookings/tour/user/${userId}`)
        .then((res) => {
          const list = res.data?.data || res.data || [];
          setBookings(Array.isArray(list) ? list : []);
        })
        .catch((err) => {
          console.error("Lỗi lấy lịch sử:", err);
        });
    }
  }, []);

  return (
    <div className="container py-4">
      <div className="mb-3">
        <BackButton label="Quay lại trang chủ" fallback="/home" />
      </div>

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
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-3 px-3">
                  <small className="text-muted fw-bold">#{item.id}</small>
                  <span className={getStatusBadge(item.status)} style={{ fontSize: "0.8rem" }}>
                    {item.status}
                  </span>
                </div>

                <div className="card-body px-3">
                  <h5 className="card-title fw-bold text-dark text-truncate mb-2">
                    {item.tourTitle || item.tour?.title || "Tour du lịch"}
                  </h5>

                  <div className="text-muted small mb-3">
                    <p className="mb-1">
                      <i className="bi bi-calendar-event me-2 text-primary"></i>
                      Ngày khởi hành:{" "}
                      <strong>{formatDate(item.bookingDate || item.bookAt)}</strong>
                    </p>
                    <p className="mb-1">
                      <i className="bi bi-people me-2 text-primary"></i>
                      Số lượng: <strong>{item.numPeople || item.guestSize || 1} người</strong>
                    </p>
                  </div>

                  <hr className="my-2" />

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">Tổng tiền:</span>
                    <span className="text-danger fw-bold fs-5">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="card-footer bg-light border-0 py-2 text-center">
                  <small className="text-muted">
                    {item.status === "CONFIRMED" ? (
                      <span className="text-success">
                        <i className="bi bi-check-circle-fill me-1"></i>Đã sẵn sàng khởi hành
                      </span>
                    ) : item.status === "PENDING" ? (
                      <span className="text-warning text-dark">
                        <i className="bi bi-hourglass-split me-1"></i>Chờ Admin duyệt
                      </span>
                    ) : (
                      <span className="text-danger">
                        <i className="bi bi-x-circle-fill me-1"></i>Đã hủy
                      </span>
                    )}
                  </small>
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
