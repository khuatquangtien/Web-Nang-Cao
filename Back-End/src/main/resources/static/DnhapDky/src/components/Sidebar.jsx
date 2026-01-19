import React from "react";
import "../App.css";

const MENU_ITEMS = [
  { icon: "ri-hotel-line", label: "Khách sạn & Chỗ nghỉ" },
  { icon: "ri-flight-takeoff-line", label: "Vé Máy bay" },
  { icon: "ri-train-line", label: "Vé Tàu" },
  { icon: "ri-car-line", label: "Đưa đón sân bay" },
  { icon: "ri-earth-line", label: "Tour & Hoạt động", active: true }, // Đang chọn mục này
  { icon: "ri-gift-line", label: "Combo Tiết kiệm" },
];

const Sidebar = () => {
  return (
    <div className="sidebar d-none d-lg-block">
      {" "}
      {/* Ẩn trên mobile, hiện trên desktop */}
      <div className="ps-3 mb-4">
        <h3 style={{ color: "#2b5ba9", fontWeight: "bold" }}>Trip.com</h3>
      </div>
      {MENU_ITEMS.map((item, index) => (
        <div
          key={index}
          className={`sidebar-item ${item.active ? "active" : ""}`}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
