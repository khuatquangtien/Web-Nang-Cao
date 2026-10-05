import React from "react";

/**
 * Component thanh phân trang nút tròn dùng chung cho mọi danh sách
 * @param {number} currentPage - Trang hiện tại (bắt đầu từ 1)
 * @param {number} totalPages - Tổng số trang
 * @param {function} onPageChange - Hàm callback khi click chuyển trang
 * @param {number} scrollTo - Vị trí pixel cuộn lên khi đổi trang (mặc định: 100)
 */
const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange, scrollTo = 100 }) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    if (onPageChange) {
      onPageChange(page);
    }
    if (typeof scrollTo === "number") {
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <nav aria-label="Page navigation" className="mt-5 mb-4">
      <ul className="pagination justify-content-center align-items-center gap-2 mb-0">
        {/* Nút Prev */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link rounded-circle border-0 shadow-sm d-flex align-items-center justify-content-center"
            style={{
              width: "40px",
              height: "40px",
              color: currentPage === 1 ? "#9ca3af" : "#374151",
              backgroundColor: "#ffffff",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>

        {/* Danh sách các số trang */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          const isActive = currentPage === pageNum;
          return (
            <li key={pageNum} className="page-item">
              <button
                type="button"
                className="page-link rounded-circle border-0 shadow-sm fw-semibold d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  background: isActive
                    ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                    : "#ffffff",
                  color: isActive ? "#ffffff" : "#374151",
                  boxShadow: isActive ? "0 4px 14px rgba(37, 99, 235, 0.35)" : "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => handlePageClick(pageNum)}
              >
                {pageNum}
              </button>
            </li>
          );
        })}

        {/* Nút Next */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link rounded-circle border-0 shadow-sm d-flex align-items-center justify-content-center"
            style={{
              width: "40px",
              height: "40px",
              color: currentPage === totalPages ? "#9ca3af" : "#374151",
              backgroundColor: "#ffffff",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
