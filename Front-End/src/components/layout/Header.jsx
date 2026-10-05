import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserBar from "../UserBar";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const UserBartoggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top py-3 glass-effect" style={{ borderBottom: "1px solid rgba(226, 232, 240, 0.8)", boxShadow: "var(--shadow-sm)" }}>
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div style={{
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#fff",
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "800",
            boxShadow: "0 4px 10px rgba(37, 99, 235, 0.3)"
          }}>
            <i className="bi bi-compass"></i>
          </div>
          <span className="fw-bold fs-4" style={{ letterSpacing: "-0.5px", color: "var(--text-main)" }}>
            HTH <span className="text-primary">Travel</span>
          </span>
        </Link>

        {/* Nút bấm thu phóng trên Mobile */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU CHÍNH */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-1">
            <li className="nav-item">
              <Link
                className="nav-link fw-semibold px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                to="/hotel"
                style={{ color: "var(--text-muted)", transition: "var(--transition-fast)" }}
              >
                <i className="bi bi-building text-primary"></i> Khách sạn
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fw-semibold px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                to="/tours"
                style={{ color: "var(--text-muted)", transition: "var(--transition-fast)" }}
              >
                <i className="bi bi-geo-alt text-primary"></i> Tour du lịch
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fw-semibold px-3 py-2 rounded-pill d-flex align-items-center gap-2 text-muted"
                to="/"
                style={{ transition: "var(--transition-fast)" }}
              >
                <i className="bi bi-airplane text-muted"></i> Vé máy bay
              </Link>
            </li>
          </ul>

          {/* KHU VỰC TÀI KHOẢN (BÊN PHẢI) */}
          <div className="d-flex align-items-center gap-3">
            {user ? (
              <div className="d-flex align-items-center gap-2">
                {/* 1. Nút Đơn đặt chỗ (không viền tròn) */}
                <Link
                  to="/my-bookings"
                  className="text-decoration-none text-dark fw-medium me-2 py-1 px-2 rounded-2"
                  style={{ fontSize: "14px", transition: "background-color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  Đơn đặt chỗ
                </Link>

                {/* 2. Avatar & Dropdown (không viền tròn bao ngoài) */}
                <div className="position-relative" ref={userMenuRef}>
                  <div
                    role="button"
                    onClick={UserBartoggle}
                    className="d-flex align-items-center gap-2 p-1 rounded-2 user-select-none"
                    style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                      style={{
                        width: "34px",
                        height: "34px",
                        fontSize: "14px",
                      }}
                    >
                      {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="d-flex flex-column text-start lh-1">
                      <span className="fw-bold text-dark text-truncate" style={{ fontSize: "13px", maxWidth: "120px" }}>
                        {user.username}
                      </span>
                      <span className="text-warning mt-1" style={{ fontSize: "11px", fontWeight: "600" }}>
                        🪙 {user.points || 0} xu
                      </span>
                    </div>
                    <i className="bi bi-caret-down-fill text-dark ms-1" style={{ fontSize: "9px" }}></i>
                  </div>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="position-absolute end-0 top-100 mt-2 z-3">
                      <UserBar UserBartoggle={UserBartoggle} onLogout={handleLogout} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/my-bookings"
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
