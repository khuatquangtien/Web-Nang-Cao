import React, { useState, useEffect } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css"; // Dùng chung CSS với Admin
import { BASE_URL } from "../../utils/config";

const CustomerManager = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // State cho Modal Sửa người dùng
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: "", username: "", email: "", role: "" });

  const toggleModal = () => setModal(!modal);

  // 1. Lấy danh sách khách hàng từ API
  const fetchUsers = async () => {
    try {
      // Gọi API lấy danh sách user từ Backend
      const res = await fetch(`${BASE_URL}/users`);
      if (!res.ok) throw new Error("Lỗi khi tải danh sách");
      const result = await res.json();
      setUsers(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Chức năng Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn XÓA khách hàng này? Mọi dữ liệu liên quan có thể bị mất.")) return;

    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Đã xóa khách hàng thành công!");
        fetchUsers(); // Tải lại bảng
      } else {
        alert("Lỗi khi xóa!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Chuẩn bị dữ liệu khi bấm nút Sửa
  const handleEditClick = (user) => {
    setSelectedUser(user);
    toggleModal(); // Mở popup
  };

  // 4. Gửi dữ liệu cập nhật lên Backend
  const handleUpdate = async (e) => {
    e.preventDefault(); // Ngăn load lại trang
    try {
      const res = await fetch(`${BASE_URL}/users/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedUser),
      });

      if (res.ok) {
        alert("Cập nhật thông tin thành công!");
        toggleModal(); // Đóng popup
        fetchUsers();  // Tải lại bảng
      } else {
        alert("Lỗi khi cập nhật!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Cập nhật state khi gõ vào Form Sửa
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  return (
    <div className="admin-container">
      {/* --- SIDEBAR --- */}
      <div className="sidebar">
        <div className="sidebar-header">HỆ THỐNG QUẢN LÝ</div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/admin")}><i className="bi bi-speedometer2"></i> Dashboard</li>
          <li onClick={() => navigate("/admin")}><i className="bi bi-cart-fill"></i> Quản lý Đặt Tour</li>
          <li className="active"><i className="bi bi-people-fill"></i> Khách hàng</li>
          <li onClick={() => navigate("/tourManager")}><i className="bi bi-map-fill"></i> Tour du lịch</li>
          <li onClick={() => navigate("/home")}><i className="bi bi-box-arrow-left"></i> Về trang chủ</li>
        </ul>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="main-content">
        <div className="top-header">
          <h4>QUẢN LÝ KHÁCH HÀNG</h4>
          <span>Admin <i className="bi bi-person-circle"></i></span>
        </div>

        <div className="content-body">
          <div className="table-custom">
            <Table responsive striped hover className="mb-0">
              <thead className="bg-light text-center">
                <tr>
                  <th>#ID</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Quyền (Role)</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {users.length === 0 ? (
                  <tr><td colSpan="5">Chưa có dữ liệu khách hàng!</td></tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td className="fw-bold">{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button size="sm" color="warning" title="Sửa" onClick={() => handleEditClick(user)}>
                            <i className="bi bi-pencil-square"></i> Sửa
                          </Button>
                          <Button size="sm" color="danger" title="Xóa" onClick={() => handleDelete(user.id)}>
                            <i className="bi bi-trash"></i> Xóa
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

      {/* --- MODAL SỬA THÔNG TIN --- */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Cập nhật thông tin Khách hàng</ModalHeader>
        <Form onSubmit={handleUpdate}>
          <ModalBody>
            <FormGroup>
              <Label for="username">Tên người dùng</Label>
              <Input type="text" name="username" id="username" value={selectedUser.username || ""} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" value={selectedUser.email || ""} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="role">Phân quyền</Label>
              <Input type="select" name="role" id="role" value={selectedUser.role || "user"} onChange={handleInputChange}>
                <option value="user">Người dùng (User)</option>
                <option value="admin">Quản trị viên (Admin)</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">Lưu thay đổi</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Hủy</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerManager;