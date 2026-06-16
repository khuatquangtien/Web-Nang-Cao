import React, { useState, useEffect } from "react";
import { Table, Button, Input, InputGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import { BASE_URL } from "../../utils/config"; // Đảm bảo đã import BASE_URL giống như hình debug trước đó

const TourManager = () => {
  const navigate = useNavigate();

  // 1. Khởi tạo state tours là một mảng rỗng [] ban đầu
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading để hiển thị khi đang tải dữ liệu

  // 2. Viết hàm lấy danh sách Tour từ API (Bắt chước y hệt hàm fetchUsers của bạn)
  const fetchTours = async () => {
    try {
      setLoading(true);
      // Giả định endpoint API của bạn là ${BASE_URL}/tours (Sửa lại đường dẫn nếu Backend của bạn đặt khác nhé)
      const res = await fetch(`${BASE_URL}/tours`);

      if (!res.ok) throw new Error("Lỗi khi tải danh sách tour du lịch!");

      const result = await res.json();
      setTours(result); // Đổ dữ liệu thật từ API vào state
    } catch (err) {
      console.error("Lỗi fetchTours: ", err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Gọi hàm fetchTours ngay khi trang vừa được tải lên
  useEffect(() => {
    fetchTours();
  }, []);

  // Hàm định dạng tiền tệ VNĐ
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

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

        {/* Content Body */}
        <div className="content-body px-4">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <div>
              <small className="text-muted">Trang chủ {">"} Tour</small>
              <h4 className="mt-1 text-primary">Danh sách Tour du lịch</h4>
            </div>

            <div className="d-flex gap-2">
              <InputGroup style={{ width: "250px" }}>
                <Input placeholder="Tìm tên tour..." />
                <Button color="light" outline className="border">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
              <Button
                color="success"
                className="d-flex align-items-center gap-1"
                onClick={() => navigate("/admin/tours/add")}
              >
                <i className="bi bi-plus-lg"></i> Thêm mới
              </Button>
            </div>
          </div>

          {/* Bảng Dữ Liệu */}
          <div className="bg-white rounded shadow-sm overflow-hidden">
            {loading ? (
              <div className="text-center p-5 fw-bold text-muted">
                Đang tải danh sách tour từ hệ thống...
              </div>
            ) : tours.length === 0 ? (
              <div className="text-center p-5 fw-bold text-muted">
                Không có tour nào trong cơ sở dữ liệu.
              </div>
            ) : (
              <Table responsive hover className="mb-0 align-middle">
                <thead className="bg-primary text-white text-center">
                  <tr>
                    <th style={{ width: "5%" }}>ID</th>
                    <th style={{ width: "10%" }}>HÌNH ẢNH</th>
                    <th style={{ width: "35%" }} className="text-start">
                      TÊN TOUR
                    </th>
                    <th style={{ width: "15%" }}>GIÁ / THỜI GIAN</th>
                    <th style={{ width: "15%" }}>ĐỊA ĐIỂM</th>
                    <th style={{ width: "10%" }}>TRẠNG THÁI</th>
                    <th style={{ width: "10%" }}>HÀNH ĐỘNG</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {tours.map((tour) => (
                    <tr key={tour.id}>
                      <td>{tour.id}</td>
                      <td>
                        {/* Lưu ý: Thay tour.image thành tên thuộc tính chứa link ảnh trong Entity Spring Boot của bạn */}
                        <img
                          src={
                            tour.image || "https://via.placeholder.com/80x50"
                          }
                          alt={tour.title}
                          className="rounded img-fluid"
                          style={{
                            width: "80px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td className="text-start">
                        {/* Nhớ kiểm tra xem Backend trả về thuộc tính là tour.title hay tour.name nhé */}
                        <div className="fw-bold">{tour.title || tour.name}</div>
                        <small className="text-muted">
                          Còn {tour.availableSlots ?? tour.slots} chỗ trống
                        </small>
                      </td>
                      <td>
                        <div className="text-danger fw-bold">
                          {formatPrice(tour.price)}
                        </div>
                        <small className="text-muted">
                          <i className="bi bi-clock"></i> {tour.duration}
                        </small>
                      </td>
                      <td>
                        <i className="bi bi-geo-alt text-primary"></i>{" "}
                        {tour.location}
                      </td>
                      <td>
                        <span
                          className={`badge ${tour.status === "Hiện" || tour.active ? "bg-success" : "bg-secondary"}`}
                        >
                          {tour.status || (tour.active ? "Hiện" : "Ẩn")}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            outline
                            color="primary"
                            size="sm"
                            title="Sửa"
                            onClick={() =>
                              navigate(`/admin/tours/${tour.id}/edit`)
                            }
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Button>
                          <Button outline color="danger" size="sm" title="Xóa">
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>

          {/* Phân trang */}
          <div className="d-flex justify-content-between align-items-center mt-3 text-muted">
            <small>Hiển thị {tours.length} tour</small>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <span className="page-link">Trước</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <span className="page-link">Sau</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourManager;
