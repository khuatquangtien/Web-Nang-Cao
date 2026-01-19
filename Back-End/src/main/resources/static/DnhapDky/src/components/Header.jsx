import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
          Trip.com
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium">
            <li className="nav-item ms-3">
              <Link className="nav-link text-dark" to="/">Khách sạn</Link>
            </li>
            <li className="nav-item ms-3">
              <Link className="nav-link text-dark" to="/">Vé máy bay</Link>
            </li>
            <li className="nav-item ms-3">
              <Link className="nav-link text-primary fw-bold" to="/">Tour du lịch</Link>
            </li>
          </ul>

          {/* --- KHU VỰC TÀI KHOẢN --- */}
          <div className="d-flex align-items-center gap-3">
            
            {user ? (
              // === ĐÃ ĐĂNG NHẬP ===
              <>
                {/* 1. MỚI THÊM: Nút Lịch sử đặt tour nằm cạnh Avatar */}
                <Link to="/my-bookings" className="text-decoration-none text-dark fw-medium me-3 btn-hover-light p-2 rounded">
                   Chuyến đi của tôi
                </Link>

                {/* 2. Phần Avatar & Dropdown cũ */}
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border-0 bg-transparent"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" 
                         style={{width: '32px', height: '32px', fontSize: '14px'}}>
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    
                    <div className="text-start lh-1">
                      <div className="fw-bold text-dark" style={{fontSize: '14px'}}>
                          {user.username || "Thành viên"}
                      </div>
                      <div className="text-warning mt-1" style={{fontSize: '11px'}}>
                         <i className="bi bi-coin me-1"></i>0 xu
                      </div>
                    </div>
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2 rounded-3">
                    <li>
                      <Link className="dropdown-item rounded-2 py-2" to="/my-bookings">
                        <i className="bi bi-journal-text me-2 text-primary"></i>Quản lý đơn hàng
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item rounded-2 py-2 text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              // === CHƯA ĐĂNG NHẬP ===
              <>
                <Link to="/register" className="text-decoration-none text-muted fw-medium me-2" style={{fontSize: '14px'}}>
                  Tra cứu đơn hàng
                </Link>
                <Link to="/login" className="btn btn-primary px-3 py-2 rounded-3 fw-bold" style={{fontSize: '14px'}}>
                  Đăng nhập / Đăng ký
                </Link>
              </>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;