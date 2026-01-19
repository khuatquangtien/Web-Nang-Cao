import { Link } from "react-router-dom";
import '../styles/thanks-you.css'; // Nhớ tạo file css này ở bước 3

const ThankYou = () => {
  return (
    <section className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center p-5 bg-white shadow rounded-3">
        {/* Icon tích xanh */}
        <div className="mb-4">
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "5rem" }}></i>
        </div>

        <h2 className="fw-bold text-success mb-3">Đặt Tour Thành Công!</h2>
        <p className="text-muted mb-4">
          Cảm ơn bạn đã đặt tour. Nhân viên sẽ sớm liên hệ để xác nhận.
        </p>

        <div className="d-grid gap-2 d-sm-flex justify-content-center">
          <Link to="/home" className="btn btn-primary rounded-pill px-4">
            Về trang chủ
          </Link>
          <Link to="/tours" className="btn btn-outline-secondary rounded-pill px-4">
            Đặt thêm tour khác
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;