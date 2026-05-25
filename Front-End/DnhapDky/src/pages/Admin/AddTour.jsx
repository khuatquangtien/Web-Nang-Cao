import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../../styles/admin.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container d-flex">
      {/* --- SIDEBAR (Giữ nguyên) --- */}
      <div className="sidebar">
        <div className="sidebar-header">HỆ THỐNG QUẢN LÝ</div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/admin")}>
            <i className="bi bi-speedometer2"></i> Dashboard
          </li>
          <li onClick={() => navigate("/admin")}>
            <i className="bi bi-cart-fill"></i> Quản lý Đặt Tour
          </li>
          <li onClick={() => navigate("/customers")}>
            <i className="bi bi-people-fill"></i> Khách hàng
          </li>
          <li onClick={() => navigate("/tourManager")}>
            <i className="bi bi-map-fill"></i> Tour du lịch
          </li>
          <li onClick={() => navigate("/home")}>
            <i className="bi bi-box-arrow-left"></i> Về trang chủ
          </li>
        </ul>
      </div>
      {/* --- MAIN CONTENT --- */}
      <div className="main-content ">
        {/* Top Header */}
        <div className="top-header ">
          <h5>Danh sách Tour du lịch</h5>
          <div className="d-flex align-items-center">
            <span>Admin </span>
            <i className="bi bi-person-circle fs-3 text-secondary ms-2"></i>
          </div>
          
        </div>
        <small className="text-muted" style={{ cursor: "pointer" }} onClick={() => navigate("/admin/tours")}>
            Trang chủ / Tour  / Add
        </small>
      </div>
    </div>
  );
};

export default AdminLayout;
