import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Component nút Quay lại dùng chung cho toàn bộ dự án
 * @param {string} label - Tiêu đề nút (mặc định: "Quay lại")
 * @param {string} fallback - Đường dẫn quay về nếu không có lịch sử duyệt web (mặc định: "/home")
 * @param {string} className - Class CSS mở rộng (tuỳ chọn)
 */
const BackButton = ({ label = "Quay lại", fallback = "/home", className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Nếu có lịch sử trang trước thì quay lại, nếu không thì về fallback
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`btn btn-white d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 shadow-sm border ${className}`}
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        color: "#374151",
        fontSize: "0.9rem",
        fontWeight: "600",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(-3px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
        e.currentTarget.style.borderColor = "#93c5fd";
        e.currentTarget.style.color = "#2563eb";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
        e.currentTarget.style.borderColor = "#e5e7eb";
        e.currentTarget.style.color = "#374151";
      }}
    >
      <i className="bi bi-arrow-left" style={{ fontSize: "1.1rem" }}></i>
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
