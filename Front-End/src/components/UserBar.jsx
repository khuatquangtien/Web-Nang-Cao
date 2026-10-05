import React from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Dropdown Menu tài khoản người dùng
 */
const UserBar = ({ UserBartoggle, onLogout }) => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (UserBartoggle) UserBartoggle();
    if (onLogout) onLogout();
    navigate("/login");
  };

  const handleItemClick = () => {
    if (UserBartoggle) UserBartoggle();
  };

  return (
    <div
      className="bg-white rounded-4 shadow-lg border p-2"
      style={{
        minWidth: "230px",
        borderColor: "#e5e7eb",
        animation: "fadeIn 0.15s ease-in-out",
      }}
    >
      {/* Header tài khoản */}
      <div className="px-3 py-2 border-bottom mb-1">
        <div className="fw-bold text-dark text-truncate" style={{ fontSize: "14px" }}>
          {user?.username || "Thành viên"}
        </div>
        <div className="d-flex align-items-center justify-content-between mt-1">
          <span className="badge bg-warning text-dark px-2 py-1" style={{ fontSize: "11px" }}>
            🪙 {user?.points || 0} xu
          </span>
          {user?.role === "ADMIN" && (
            <span className="badge bg-danger px-2 py-1" style={{ fontSize: "10px" }}>
              ADMIN
            </span>
          )}
        </div>
      </div>

      {/* Danh sách chức năng */}
      <div className="d-flex flex-column gap-1">
        {/* Đơn đặt chỗ */}
        <Link
          to="/my-bookings"
          onClick={handleItemClick}
          className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-dark text-decoration-none"
          style={{ fontSize: "14px", transition: "background 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <i className="bi bi-journal-text text-primary" style={{ fontSize: "16px" }}></i>
          <span>Đơn đặt chỗ của tôi</span>
        </Link>

        {/* Nếu là Admin thì có mục quản trị */}
        {user?.role === "ADMIN" && (
          <Link
            to="/admin"
            onClick={handleItemClick}
            className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-dark text-decoration-none"
            style={{ fontSize: "14px", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fef2f2")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <i className="bi bi-shield-lock text-danger" style={{ fontSize: "16px" }}></i>
            <span className="fw-semibold text-danger">Trang quản trị (Admin)</span>
          </Link>
        )}

        {/* Quản lý tài khoản */}
        <div
          onClick={handleItemClick}
          className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-dark cursor-pointer"
          style={{ fontSize: "14px", cursor: "pointer", transition: "background 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <i className="bi bi-person-gear text-secondary" style={{ fontSize: "16px" }}></i>
          <span>Quản lý tài khoản</span>
        </div>

        {/* Cài đặt */}
        <div
          onClick={handleItemClick}
          className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-dark cursor-pointer"
          style={{ fontSize: "14px", cursor: "pointer", transition: "background 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <i className="bi bi-gear text-secondary" style={{ fontSize: "16px" }}></i>
          <span>Cài đặt</span>
        </div>

        <hr className="my-1 text-muted" />

        {/* Đăng xuất */}
        <div
          onClick={handleLogout}
          className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-danger cursor-pointer"
          style={{ fontSize: "14px", cursor: "pointer", transition: "background 0.15s", fontWeight: "600" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fef2f2")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <i className="bi bi-box-arrow-right text-danger" style={{ fontSize: "16px" }}></i>
          <span>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

export default UserBar;
