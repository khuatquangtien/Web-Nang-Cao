import React from "react";

/**
 * Component hiển thị trạng thái đang tải dữ liệu dùng chung
 * @param {string} text - Thông báo hiển thị
 */
const LoadingSpinner = ({ text = "Đang tải dữ liệu..." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 my-3">
      <div
        className="spinner-border text-primary mb-3"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted fw-semibold small">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
