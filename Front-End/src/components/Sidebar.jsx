import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const menuItems = [
    { icon: "bi bi-globe", text: "Tour & Hoạt động", path: "/tours" },
    { icon: "bi bi-building", text: "Khách sạn & Chỗ nghỉ", path:"/hotels" },
    { icon: "bi bi-airplane", text: "Vé Máy bay" },
    { icon: "bi bi-train-front", text: "Vé Tàu" },
    { icon: "bi bi-car-front", text: "Đưa đón sân bay" },
    { icon: "bi bi-gift", text: "Combo Tiết kiệm" },
  ];
  const [index, setindex] = React.useState(0);

  return (
    <div>
      {menuItems.map((item, idx) => (
        // 3. Đổi thẻ <div> thành <Link> và truyền url vào thuộc tính to
        <Link
          to={item.path}
          key={idx}
          className={`sidebar-item ${index === idx ? "active" : ""}`}
          onClick={() => setindex(idx)} // Cập nhật lại vị trí menu đang được chọn để sáng đèn (active)
          style={{
            fontSize: "19px",
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "12px", // Tạo khoảng cách giữa Icon và Chữ cho thoáng
            padding: "10px 15px",
          }} // Giữ nguyên style chữ, không bị gạch chân kiểu link
        >
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
