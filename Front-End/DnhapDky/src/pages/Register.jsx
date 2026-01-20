import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register-custom.css"; // 👈 Import file CSS mới tạo

const Register = () => {
  const navigate = useNavigate();
  
  // State lưu dữ liệu form
  const [credentials, setCredentials] = useState({
    username: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  // State để ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Validate đơn giản
    if(!credentials.username || !credentials.email || !credentials.password || !credentials.phone) {
        alert("Vui lòng điền đầy đủ các trường bắt buộc!");
        return;
    }

    try {
      const res = await axios.post("http://localhost:9090/users/register", credentials);
      if (res.status === 200 || res.status === 201) {
        alert("✅ Đăng ký thành công!");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Đăng ký thất bại. Kiểm tra lại thông tin!");
    }
  };

  return (
    <div className="register-section">
      <div className="register-card">
        <h2 className="register-title">Đăng ký tài khoản</h2>
        
        <form onSubmit={handleClick}>
          
          {/* 1. Tên đăng nhập (Bắt buộc theo DB) */}
          <div className="form-group">
            <label className="form-label">Tên đăng nhập <span className="required-star">*</span></label>
            <input 
              type="text" 
              id="username"
              className="form-input" 
              placeholder="Nhập tên đăng nhập (viết liền)"
              onChange={handleChange}
              required
            />
          </div>

          {/* 2. Số điện thoại */}
          <div className="form-group">
            <label className="form-label">Số điện thoại <span className="required-star">*</span></label>
            <input 
              type="text" 
              id="phone"
              className="form-input" 
              placeholder="Nhập số điện thoại"
              onChange={handleChange}
              required
            />
          </div>

          {/* 3. Email */}
          <div className="form-group">
            <label className="form-label">Email <span className="required-star">*</span></label>
            <input 
              type="email" 
              id="email"
              className="form-input" 
              placeholder="Nhập địa chỉ email"
              onChange={handleChange}
              required
            />
          </div>

          {/* 4. Họ và tên */}
          <div className="form-group">
            <label className="form-label">Họ và tên <span className="required-star">*</span></label>
            <input 
              type="text" 
              id="fullName"
              className="form-input" 
              placeholder="Nhập họ và tên đầy đủ"
              onChange={handleChange}
              required
            />
          </div>

          {/* 5. Mật khẩu + Nút HIỆN */}
          <div className="form-group">
            <label className="form-label">Mật khẩu <span className="required-star">*</span></label>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password"
              className="form-input" 
              placeholder="Nhập mật khẩu"
              onChange={handleChange}
              required
            />
            <button type="button" className="password-toggle" onClick={togglePassword}>
              {showPassword ? "ẨN" : "HIỆN"}
            </button>
          </div>

          {/* Button Submit */}
          <button type="submit" className="btn-submit">
            Đăng ký ngay
          </button>

          {/* Footer Link */}
          <div className="register-footer">
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;