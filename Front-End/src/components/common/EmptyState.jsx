import React from "react";

/**
 * Component hiển thị trạng thái danh sách trống dùng chung
 * @param {string} title - Tiêu đề thông báo
 * @param {string} message - Nội dung chi tiết
 * @param {string} icon - Icon class Bootstrap Icons
 * @param {React.ReactNode} action - Nút hành động tuỳ chọn
 */
const EmptyState = ({
  title = "Không tìm thấy kết quả",
  message = "Hãy thử tìm kiếm với từ khóa khác hoặc quay lại sau.",
  icon = "bi-search",
  action = null,
}) => {
  return (
    <div className="text-center py-5 my-4 bg-light rounded-4 border border-dashed">
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow-sm"
        style={{
          width: "64px",
          height: "64px",
          backgroundColor: "#ffffff",
          color: "#6b7280",
          fontSize: "1.75rem",
        }}
      >
        <i className={`bi ${icon}`}></i>
      </div>
      <h5 className="fw-bold text-dark mb-1">{title}</h5>
      <p className="text-muted mb-3 small" style={{ maxWidth: "400px", margin: "0 auto" }}>
        {message}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
