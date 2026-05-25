import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import { BASE_URL } from "../../utils/config";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart, // Thêm mới
  Pie, // Thêm mới
  Cell, // Thêm mới
  Legend, // Thêm mới
} from "recharts";

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const chartData = bookings.map((b) => ({
    date: b.bookingDate,
    total: b.totalPrice || 0,
  }));
  // biểu đồ chart
  const charData = bookings.map((b) => ({
    date: b.bookingDate,
    total: b.totalPrice || 0,
  }));
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const confirmedCount = bookings.filter(
    (b) => b.status === "CONFIRMED",
  ).length;
  const cancelledCount = bookings.filter(
    (b) => b.status === "CANCELLED",
  ).length;
  const pieData = [
    { name: "Đang chờ", value: pendingCount },
    { name: "Đã duyệt", value: confirmedCount },
    { name: "Đã hủy", value: cancelledCount },
  ];
  const COLORS = ["#f0ad4e", "#5cb85c", "#d9534f"]; // Màu cho từng trạng thái
  // 1. Lấy dữ liệu từ API
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/tour`);
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      setBookings(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 2. Hàm xử lý Duyệt/Hủy/Xóa
  const updateStatus = async (id, status) => {
    if (!window.confirm(`Bạn có chắc muốn chuyển trạng thái thành ${status}?`))
      return;

    try {
      const res = await fetch(`${BASE_URL}/bookings/tour/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status }), // Gửi status dạng JSON
      });

      if (res.ok) {
        alert("Thành công!");
        fetchBookings(); // Load lại bảng sau khi update
      } else {
        alert("Lỗi khi cập nhật!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  // chức năng xóa vĩnh viễn đơn đặt tour, chỉ dành cho admin, có xác nhận trước khi xóa
  const deleteBooking = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn XÓA vĩnh viễn đơn này?")) return;
    try {
      await fetch(`${BASE_URL}/bookings/tour/${id}`, { method: "DELETE" });
      fetchBookings();
    } catch (err) {
      alert("Lỗi xóa");
    }
  };
  // biểu đồ pie chart về trạng thái đơn đặt tour (đang chờ, đã duyệt, đã hủy) - tạm thời để placeholder nếu chưa làm

  return (
    <div className="admin-container">
      {/* --- SIDEBAR --- */}
      <div className="sidebar">
        <div className="sidebar-header">HỆ THỐNG QUẢN LÝ</div>
        <ul className="sidebar-menu">
          <li>
            <i className="bi bi-speedometer2"></i> Dashboard
          </li>
          <li className="active">
            <i className="bi bi-cart-fill"></i> Quản lý Đặt Tour
          </li>
          <li onClick={() => navigate("/customers")}>
            <i className="bi bi-people-fill" ></i> Khách hàng
          </li>
          <li onClick={() => navigate("/tourManager")}>
            <i
              className="bi bi-map-fill"
              
            ></i>{" "}
            Tour du lịch
          </li>
          <li onClick={() => navigate("/home")}>
            <i className="bi bi-box-arrow-left"></i> Về trang chủ
          </li>
        </ul>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="main-content">
        <div className="top-header">
          <h4>QUẢN LÝ ĐẶT TOUR</h4>
          <span>
            Admin <i className="bi bi-person-circle"></i>
          </span>
        </div>

        <div className="content-body">
          <div className="stats-grid">
            <div className="dashboard-row">
              {/* CHART */}
              <div className="chart-box">
                <h5>Biểu đồ doanh thu</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#4e73df" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* PIE (tạm thời để placeholder nếu chưa làm) */}
              <div className="pie-box">
                <h5>Trạng thái</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60} // Để tạo hình Donut (trống ở giữa), nếu muốn đặc thì xóa dòng này
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label // Hiển thị số liệu bên cạnh
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="stat-card">
              <h6>Tổng doanh thu</h6>
              <h3>
                {bookings
                  .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
                  .toLocaleString()}
                <span> VND</span>
              </h3>
            </div>

            <div className="stat-card">
              <h6>Tổng lượt đặt</h6>
              <h3>{bookings.length}</h3>
            </div>

            <div className="stat-card">
              <h6>Khách hàng</h6>
              <h3>{new Set(bookings.map((b) => b.customerName)).size}</h3>
            </div>

            <div className="stat-card">
              <h6>Đang chờ</h6>
              <h3>{bookings.filter((b) => b.status === "PENDING").length}</h3>
            </div>
          </div>
          <div className="table-custom">
            <Table responsive striped hover className="mb-0">
              <thead className="bg-light text-center">
                <tr>
                  <th>#ID</th>
                  <th>Khách hàng</th>
                  <th>SĐT</th>
                  <th>Tour đăng ký</th>
                  <th>Ngày đi</th>
                  <th>Số người</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="9">Chưa có đơn đặt nào!</td>
                  </tr>
                ) : (
                  bookings.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      {/* Hiển thị tên khách (ưu tiên customerName mới thêm, nếu ko có thì lấy user) */}
                      <td className="fw-bold">
                        {item.customerName || item.user?.username}
                      </td>
                      <td>{item.customerPhone || "---"}</td>
                      <td>{item.tour?.title}</td>
                      <td>{item.bookingDate}</td>
                      <td>{item.numPeople}</td>
                      <td className="text-primary fw-bold">
                        {item.totalPrice?.toLocaleString()} <span> VND</span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            item.status === "CONFIRMED"
                              ? "status-confirmed"
                              : item.status === "CANCELLED"
                                ? "status-cancelled"
                                : "status-pending"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          {/* Nút Duyệt (Chỉ hiện khi chưa Confirm) */}
                          {item.status === "PENDING" && (
                            <Button
                              size="sm"
                              color="success"
                              onClick={() => updateStatus(item.id, "CONFIRMED")}
                              title="Duyệt đơn"
                            >
                              <i className="bi bi-check-lg"></i>
                            </Button>
                          )}
                          {/* Nút Hủy */}
                          {item.status !== "CANCELLED" && (
                            <Button
                              size="sm"
                              color="warning"
                              onClick={() => updateStatus(item.id, "CANCELLED")}
                              title="Hủy đơn"
                            >
                              <i className="bi bi-x-circle"></i>
                            </Button>
                          )}
                          {/* Nút Xóa */}
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => deleteBooking(item.id)}
                            title="Xóa vĩnh viễn"
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
