import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <section className="py-5 bg-light" style={{ minHeight: "80vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            {/* Icon tích xanh thành công */}
            <div className="mb-4">
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "5rem" }}
              ></i>
            </div>

            <h2 className="fw-bold mb-3 text-success">Đặt Tour Thành Công!</h2>
            <p className="lead text-muted mb-5">
              Cảm ơn bạn đã tin tưởng lựa chọn dịch vụ của chúng tôi. <br />
              Nhân viên sẽ sớm liên hệ lại qua số điện thoại để xác nhận lịch
              trình.
            </p>

            {/* Các nút điều hướng */}
            <div className="d-flex justify-content-center gap-3">
              <Link
                to="/home"
                className="btn btn-primary btn-lg px-4 rounded-pill"
              >
                <i className="bi bi-house-door-fill me-2"></i> Về trang chủ
              </Link>

              {/* Nút này sẽ dẫn đến trang xem lịch sử đặt vé (làm ở các bước sau) */}
              <Link
                to="/tours"
                className="btn btn-outline-secondary btn-lg px-4 rounded-pill"
              >
                Xem thêm tour khác
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
