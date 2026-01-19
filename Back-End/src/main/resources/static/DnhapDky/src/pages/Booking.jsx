import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy dữ liệu tour được gửi sang từ trang Detail
  const tour = location.state?.tour;

  // State lưu thông tin form
  const [bookingInfo, setBookingInfo] = useState({
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "", // Ngày khởi hành
  });

  // Tính tổng tiền tự động
  const totalAmount = (tour?.price || 0) * Number(bookingInfo.guestSize);

  // Xử lý khi nhập liệu
  const handleChange = (e) => {
    setBookingInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Xử lý khi bấm nút "Xác nhận đặt"
  // Xử lý khi bấm nút "Xác nhận đặt"
  // --- HÀM CẦN SỬA ---
  const handleClick = async (e) => {
    e.preventDefault();

    // 1. Kiểm tra đăng nhập
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
        alert("⚠️ Bạn cần đăng nhập để đặt vé!");
        navigate("/login");
        return;
    }

    // 2. Lấy User ID an toàn (Khớp với Login mới)
    const userObj = JSON.parse(storedUser);
    // Code này sẽ tự tìm id dù nó nằm ở userObj.id hay userObj.user.id
    console.log("👉 DỮ LIỆU USER THẬT:", userObj);
    
    const userId = userObj.id || userObj.user?.id; 

    try {
      // 3. Chuẩn bị dữ liệu (Khớp với Backend Java)
      const body = {
        bookingDate: bookingInfo.bookAt,          // Ngày đi
        numPeople: Number(bookingInfo.guestSize), // Số người
        totalPrice: totalAmount,                  // Tổng tiền
        status: "PENDING",                        // Trạng thái mặc định
        tour: { id: tour.id },                    // ID Tour
        user: { id: userId },                     // ID User
      };

      console.log("Dữ liệu gửi đi:", body); // (Bật F12 xem log nếu lỗi)

      // 4. Gọi API
      const res = await axios.post("http://localhost:9090/bookings", body);
      
      if (res.status === 200 || res.status === 201) {
        alert("✅ Đặt tour thành công! Bạn có thể xem lại trong lịch sử.");
        
        // QUAN TRỌNG: Chuyển sang trang Lịch sử thay vì Thank You
        // Để kiểm tra xem đơn hàng có hiện ra không
        navigate("/my-bookings"); 
      }
    } catch (err) {
      console.error(err);
      alert("❌ Đặt tour thất bại. Vui lòng thử lại!");
    }
  };

  // Nếu truy cập thẳng link /booking mà không chọn tour trước thì đuổi về Home
  if (!tour)
    return <div className="text-center mt-5">Vui lòng chọn tour trước!</div>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Xác nhận đặt tour</h2>
      <div className="row">
        {/* CỘT TRÁI: Thông tin Tour tóm tắt */}
        <div className="col-md-5">
          <div className="card shadow-sm">
            <img
              src={tour.image}
              className="card-img-top"
              alt={tour.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{tour.title}</h5>
              <p className="text-muted">
                <i className="bi bi-geo-alt"></i> {tour.address}
              </p>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Giá vé:</span>
                <strong>{tour.price.toLocaleString()} đ</strong>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: Form điền thông tin */}
        <div className="col-md-7">
          <div className="card p-4 shadow-sm border-0">
            <h4 className="mb-3 text-primary">Thông tin đặt vé</h4>
            <form onSubmit={handleClick}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Họ tên người đặt
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Nguyễn Văn A"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="0912..."
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="bookAt" className="form-label">
                    Ngày khởi hành
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="bookAt"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="guestSize" className="form-label">
                    Số người đi
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="guestSize"
                    min="1"
                    max={tour.maxGroupSize}
                    defaultValue={1}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <hr />
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Tổng cộng:</h5>
                <h3 className="text-danger fw-bold">
                  {totalAmount.toLocaleString()} VND
                </h3>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 py-2 fw-bold"
              >
                XÁC NHẬN THANH TOÁN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
