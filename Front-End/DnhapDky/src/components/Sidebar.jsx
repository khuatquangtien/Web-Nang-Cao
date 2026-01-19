import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { icon: "bi bi-building", text: "Khách sạn & Chỗ nghỉ" },
    { icon: "bi bi-airplane", text: "Vé Máy bay" },
    { icon: "bi bi-train-front", text: "Vé Tàu" },
    { icon: "bi bi-car-front", text: "Đưa đón sân bay" },
    { icon: "bi bi-globe", text: "Tour & Hoạt động", active: true }, // Đang active ở tab này
    { icon: "bi bi-gift", text: "Combo Tiết kiệm" },
  ];

  return (
    <div>
      {menuItems.map((item, index) => (
        <div key={index} className={`sidebar-item ${item.active ? 'active' : ''}`}>
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;