import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register-custom.css"; 
import { BASE_URL } from "../utils/config";

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

  // State lưu thông báo lỗi cho từng field
  const [errors, setErrors] = useState({});

  // State để ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
    
    // Xóa thông báo lỗi của field đó khi người dùng bắt đầu gõ lại
    if (errors[id]) {
        setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Hàm kiểm tra dữ liệu hợp lệ
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    // 1. Validate Username (Không khoảng trắng)
    if (!credentials.username) {
        tempErrors.username = "Tên đăng nhập không được để trống.";
        isValid = false;
    } else if (/\s/.test(credentials.username)) {
        tempErrors.username = "Tên đăng nhập không được chứa khoảng trắng.";
        isValid = false;
    }

    // 2. Validate Phone (Chuẩn số điện thoại VN 10 số)
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!credentials.phone) {
        tempErrors.phone = "Số điện thoại không được để trống.";
        isValid = false;
    } else if (!phoneRegex.test(credentials.phone)) {
        tempErrors.phone = "Số điện thoại không hợp lệ (gồm 10 số, bắt đầu bằng 03,05,07,08,09).";
        isValid = false;
    }

    // 3. Validate Email (Đúng định dạng @)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!credentials.email) {
        tempErrors.email = "Email không được để trống.";
        isValid = false;
    } else if (!emailRegex.test(credentials.email)) {
        tempErrors.email = "Email không đúng định dạng.";
        isValid = false;
    }

    // 4. Validate Full Name
    if (!credentials.fullName) {
        tempErrors.fullName = "Họ và tên không được để trống.";
        isValid = false;
    }

    // 5. Validate Password (Tối thiểu 6 ký tự)
    if (!credentials.password) {
        tempErrors.password = "Mật khẩu không được để trống.";
        isValid = false;
    } else if (credentials.password.length < 6) {
        tempErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
        isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    // 1. Chạy hàm kiểm tra định dạng ở Frontend trước (hàm validate đã viết ở trên)
    if (!validate()) {
        return; 
    }

    try {
      // 2. Gửi dữ liệu lên Backend (Lưu ý sửa lại đúng Port, ví dụ 8080)
      const res = await axios.post(`${BASE_URL}/users/register`, credentials);
      
      if (res.status === 200 || res.status === 201) {
        alert("✅ Đăng ký thành công!");
        navigate("/login");
      }
    } catch (err) {
      // 3. Bắt lỗi từ Spring Boot trả về
      if (err.response && err.response.data) {
          
          // Lấy trực tiếp chuỗi lỗi do Spring trả về (ví dụ: "Email đã được đăng kí")
          // Kiểm tra typeof để phòng hờ trường hợp sau này bạn đổi sang trả về JSON
          const errorMessage = typeof err.response.data === 'string' 
                ? err.response.data 
                : err.response.data.message;

          // So sánh chính xác từng câu chữ với Backend của bạn
          if (errorMessage === "Email đã được đăng kí") {
              setErrors((prev) => ({ ...prev, email: errorMessage })); // Bôi đỏ dưới ô Email
          } 
          else if (errorMessage === "Tên đăng nhập này đã tồn tại!") {
              setErrors((prev) => ({ ...prev, username: errorMessage })); // Bôi đỏ dưới ô Username
          } 
          else {
              // Lỗi khác không lường trước được
              alert(errorMessage || "❌ Đăng ký thất bại. Kiểm tra lại thông tin!");
          }
      } else {
          alert("❌ Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại Backend!");
      }
    }
  };

  return (
    <div className="register-section">
      <div className="register-card">
        <h2 className="register-title">Đăng ký tài khoản</h2>
        
        <form onSubmit={handleClick} noValidate>
          
          {/* 1. Tên đăng nhập */}
          <div className="form-group">
            <label className="form-label">Tên đăng nhập <span className="required-star">*</span></label>
            <input 
              type="text" 
              id="username"
              className={`form-input ${errors.username ? 'input-error' : ''}`} 
              placeholder="Nhập tên đăng nhập (viết liền)"
              onChange={handleChange}
              value={credentials.username}
            />
            {errors.username && <p className="error-message" style={{color: "red", fontSize: "12px", marginTop: "5px"}}>{errors.username}</p>}
          </div>

          {/* 2. Số điện thoại */}
          <div className="form-group">
            <label className="form-label">Số điện thoại <span className="required-star">*</span></label>
            <input 
              type="text" 
              id="phone"
              className={`form-input ${errors.phone ? 'input-error' : ''}`} 
              placeholder="Nhập số điện thoại"
              onChange={handleChange}
              value={credentials.phone}
            />
            {errors.phone && <p className="error-message" style={{color: "red", fontSize: "12px", marginTop: "5px"}}>{errors.phone}</p>}
          </div>

          {/* 3. Email */}
          <div className="form-group">
            <label className="form-label">Email <span className="required-star">*</span></label>
            <input 
              type="email" 
              id="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`} 
              placeholder="Nhập địa chỉ email"
              onChange={handleChange}
              value={credentials.email}
            />
            {errors.email && <p className="error-message" style={{color: "red", fontSize: "12px", marginTop: "5px"}}>{errors.email}</p>}
          </div>

          {/* 4. Họ và tên */}
          <div className="form-group">
            <label className="form-label">Họ và tên <span className="required-star">*</span></label>
            <input 
              type="text" 
              id="fullName"
              className={`form-input ${errors.fullName ? 'input-error' : ''}`} 
              placeholder="Nhập họ và tên đầy đủ"
              onChange={handleChange}
              value={credentials.fullName}
            />
            {errors.fullName && <p className="error-message" style={{color: "red", fontSize: "12px", marginTop: "5px"}}>{errors.fullName}</p>}
          </div>

          {/* 5. Mật khẩu + Nút HIỆN */}
          <div className="form-group" style={{position: "relative"}}>
            <label className="form-label">Mật khẩu <span className="required-star">*</span></label>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password"
              className={`form-input ${errors.password ? 'input-error' : ''}`} 
              placeholder="Nhập mật khẩu"
              onChange={handleChange}
              value={credentials.password}
            />
            <button type="button" className="password-toggle" onClick={togglePassword} style={{position: "absolute", right: "10px", top: "35px", background: "none", border: "none", cursor: "pointer"}}>
              {showPassword ? "ẨN" : "HIỆN"}
            </button>
            {errors.password && <p className="error-message" style={{color: "red", fontSize: "12px", marginTop: "5px"}}>{errors.password}</p>}
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