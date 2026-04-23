import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

      const user = res.data; // ✅ lấy user từ API
      console.log(res.data);
      // 1. Lưu token
      localStorage.setItem("token", user.token);

      // 2. Lưu user
      localStorage.setItem("user", JSON.stringify(user));

      alert("Đăng nhập thành công!");
      // 3. Điều hướng
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Sai tài khoản hoặc mật khẩu!";
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
            <label>
              Tên đăng nhập <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label>
              Mật khẩu <span className="text-red">*</span>
            </label>
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
            Chưa là thành viên?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                cursor: "pointer",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              Đăng ký ngay
            </span>
          </div>
          {/*Link quên mật khẩu */}
          <div className="auth-link">
            <span
              onClick={() => navigate("/forgetPassword")}
              style={{
                cursor: "pointer",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              Quên mật khẩu?
            </span>
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
