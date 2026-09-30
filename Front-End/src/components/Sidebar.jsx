import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const menuItems = [
    { icon: "bi bi-compass", text: "Tất cả Tour", path: "/tours", badge: "Hot" },
    { icon: "bi bi-building", text: "Khách sạn & Chỗ nghỉ", path: "/hotels" },
    { icon: "bi bi-airplane", text: "Vé Máy bay", path: "#", badge: "Sắp ra mắt" },
    { icon: "bi bi-train-front", text: "Vé Tàu hỏa", path: "#" },
    { icon: "bi bi-car-front", text: "Xe đưa đón", path: "#" },
    { icon: "bi bi-gift", text: "Ưu đãi Combo", path: "#" },
  ];
  const [index, setIndex] = React.useState(0);

  return (
    <div className="bg-white p-3 rounded-4 shadow-sm border" style={{ borderColor: "var(--border-color)" }}>
      <h6 className="fw-bold px-3 py-2 text-uppercase mb-2" style={{ fontSize: "0.75rem", letterSpacing: "1px", color: "var(--text-light)" }}>
        Danh mục dịch vụ
      </h6>
      <div className="d-flex flex-column gap-1">
        {menuItems.map((item, idx) => {
          const isActive = index === idx;
          return (
            <Link
              to={item.path}
              key={idx}
              onClick={() => setIndex(idx)}
              className="text-decoration-none d-flex align-items-center justify-content-between px-3 py-2 rounded-3"
              style={{
                transition: "var(--transition-fast)",
                background: isActive ? "var(--primary-light)" : "transparent",
                color: isActive ? "var(--primary)" : "var(--text-main)",
                fontWeight: isActive ? "600" : "500",
                fontSize: "0.95rem"
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <i className={`${item.icon}`} style={{
                  fontSize: "1.1rem",
                  color: isActive ? "var(--primary)" : "var(--text-muted)"
                }}></i>
                <span>{item.text}</span>
              </div>
              {item.badge && (
                <span className="badge rounded-pill" style={{
                  fontSize: "0.65rem",
                  background: item.badge === "Hot" ? "linear-gradient(135deg, #ef4444, #f97316)" : "#e2e8f0",
                  color: item.badge === "Hot" ? "#fff" : "#64748b"
                }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};


export default Sidebar;
