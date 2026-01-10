import React, { useState } from 'react';
import { register } from '../services/authService';
import '../Auth.css'; 

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    for (let key in form) {
      if (!form[key]) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }
    }

    try {
      await register(form); 
      alert("Đăng ký thành công! Chào mừng " + form.fullName);
      window.location.href = "/login"; 
    } catch (err) {
      alert("Đăng ký thất bại, tên đăng nhập hoặc email có thể đã tồn tại!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Đăng ký tài khoản</h2>
        
        <form onSubmit={handleSubmit}>
          
          {/* Tên đăng nhập */}
          <div className="form-group">
            <label>Tên đăng nhập <span className="text-red">*</span></label>
            <input 
              type="text" 
              placeholder="Nhập tên đăng nhập" 
              value={form.username}
              onChange={(e) => setForm({...form, username: e.target.value})} 
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email <span className="text-red">*</span></label>
            <input 
              type="email" 
              placeholder="Nhập địa chỉ email" 
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})} 
            />
          </div>

          {/* Họ và tên */}
          <div className="form-group">
            <label>Họ và tên <span className="text-red">*</span></label>
            <input 
              type="text" 
              placeholder="Nhập họ và tên đầy đủ" 
              value={form.fullName}
              onChange={(e) => setForm({...form, fullName: e.target.value})} 
            />
          </div>

          {/* Mật khẩu (Có nút ẩn/hiện) */}
          <div className="form-group">
            <label>Mật khẩu <span className="text-red">*</span></label>
            <div className="input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Nhập mật khẩu" 
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})} 
              />
              <span 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{ fontSize: '12px', fontWeight: 'bold', userSelect: 'none' }}
              >
                {showPassword ? "ẨN" : "HIỆN"}
              </span>
            </div>
          </div>

          {/* Nút Đăng ký */}
          <button type="submit" className="btn-primary">ĐĂNG KÝ NGAY</button>
        </form>

        {/* Link chuyển qua đăng nhập */}
        <div className="auth-link" style={{ textAlign: 'center', marginTop: '20px' }}>
           Bạn đã có tài khoản ? <a href="/login">Đăng nhập tại đây</a>
        </div>

      </div>
    </div>
  );
}

export default Register;