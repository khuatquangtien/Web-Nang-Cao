import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { login } from '../services/authService'; 
import '../Auth.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      return;
    }

    setIsLoading(true); 

    try {
      const res = await login({ username, password });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      
      alert("Đăng nhập thành công!");
      
      navigate("/my-bookings"); 
    } catch (err) {
      console.error(err);
      
      const message = err.response?.data?.message || "Sai tài khoản hoặc mật khẩu!";
      alert(message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Đăng nhập</h2>
    
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="form-group">
            <label>Số điện thoại hoặc email <span className="text-red">*</span></label>
            <input 
              type="text"
              placeholder="Nhập số điện thoại hoặc email" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label>Mật khẩu <span className="text-red">*</span></label>
            <div className="input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Nhập mật khẩu" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                disabled={isLoading}
              />
              <span 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                tabIndex={0}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Link Đăng ký */}
          <div className="auth-link">
            Chưa là thành viên? <span onClick={() => navigate('/register')} style={{cursor: 'pointer', color: '#007bff', fontWeight: 'bold'}}>Đăng ký ngay</span>
          </div>

          {/* Button Submit */}
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;