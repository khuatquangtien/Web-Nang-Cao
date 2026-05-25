import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { icon: "bi bi-globe", text: "Tour & Hoạt động", },
    { icon: "bi bi-building", text: "Khách sạn & Chỗ nghỉ",  },
    { icon: "bi bi-airplane", text: "Vé Máy bay" },
    { icon: "bi bi-train-front", text: "Vé Tàu" },
    { icon: "bi bi-car-front", text: "Đưa đón sân bay" },
    { icon: "bi bi-gift", text: "Combo Tiết kiệm" },
  ];
  const[index, setindex] = React.useState(0);
  return (
    <div>
      {menuItems.map((item, index) => (
        <div key={index} className={`sidebar-item ${item.active ? 'active' : ''}`} style={{ fontSize: "18px" }}>
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;