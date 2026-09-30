import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserBar from "./UserBar";
const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const UserBartoggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar navbar-expand-lg sticky-top py-3 glass-effect" style={{ borderBottom: "1px solid rgba(226, 232, 240, 0.8)", boxShadow: "var(--shadow-sm)" }}>
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "1.2rem",
            boxShadow: "var(--shadow-glow)"
          }}>
            <i className="bi bi-compass"></i>
          </div>
          <span style={{
            fontWeight: "800",
            fontSize: "1.5rem",
            letterSpacing: "-0.5px",
            background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            HTH Travel
          </span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold ms-lg-4 gap-2">
            <li className="nav-item">
              <Link className="nav-link px-3 py-2 rounded-pill text-secondary-emphasis" to="/hotel" style={{ transition: "var(--transition-fast)" }}>
                <i className="bi bi-building me-1"></i> Khách sạn
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 py-2 rounded-pill text-secondary-emphasis" to="/home" style={{ transition: "var(--transition-fast)" }}>
                <i className="bi bi-geo-alt me-1"></i> Tour du lịch
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 py-2 rounded-pill text-muted opacity-75" to="#" title="Tính năng đang phát triển">
                <i className="bi bi-airplane me-1"></i> Vé máy bay
              </Link>
            </li>
          </ul>


          {/* --- KHU VỰC TÀI KHOẢN --- */}
          <div className="d-flex align-items-center gap-3">
            {user ? (
              // === ĐÃ ĐĂNG NHẬP ===
              <>
                {/* 1. MỚI THÊM: Nút Lịch sử đặt tour nằm cạnh Avatar */}
                <Link
                  to="/my-bookings"
                  className="text-decoration-none text-dark fw-medium me-3 btn-hover-light p-2 rounded"
                >
                  Đơn đặt chỗ
                </Link>

                {/* 2. Phần Avatar & Dropdown cũ */}
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border-0 bg-transparent"
                    type="button"
                    data-bs-toggle="dropdown"
                    onClick={UserBartoggle}
                  >
                    {isOpen && <UserBar />}
                    <div
                      className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                      style={{
                        width: "32px",
                        height: "32px",
                        fontSize: "14px",
                      }}
                    >
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <div className="text-start lh-1">
                      <div
                        className="fw-bold text-dark"
                        style={{ fontSize: "14px" }}
                      >
                        {user.username || "Thành viên"}
                      </div>
                      <div
                        className="text-warning mt-1"
                        style={{ fontSize: "11px" }}
                      >
                        <i className="bi bi-coin me-1"></i>0 xu
                      </div>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              // === CHƯA ĐĂNG NHẬP ===
              <>
                <Link
                  to="/register"
                  className="text-decoration-none text-muted fw-medium me-2"
                  style={{ fontSize: "14px" }}
                >
                  Tra cứu đơn hàng
                </Link>
                <Link
                  to="/login"
                  className="btn btn-primary px-3 py-2 rounded-3 fw-bold"
                  style={{ fontSize: "14px" }}
                >
                  Đăng nhập / Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
