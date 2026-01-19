import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/login.css"; // (Nếu bạn chưa có file css thì tạo sau cũng được)
import userIcon from "../assets/images/user.png"; // Thay bằng ảnh icon user của bạn hoặc xóa dòng này

const Register = () => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Gọi API đăng ký (kiểm tra lại đường dẫn Backend của bạn xem là /auth/register hay /users/register)
      const res = await axios.post("http://localhost:9090/auth/register", credentials);

      if (res.status === 200 || res.status === 201) {
        alert("✅ Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      }
    } catch (err) {
      alert("❌ Đăng ký thất bại. Tên đăng nhập hoặc Email có thể đã tồn tại.");
      console.error(err);
    }
  };

  return (
    <section className="login-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="login-container shadow p-5 rounded bg-white mt-5">
              <h2 className="text-center fw-bold mb-4">Đăng Ký</h2>
              
              <form onSubmit={handleClick}>
                <div className="mb-3">
                  <input type="text" placeholder="Tên đăng nhập" id="username" 
                    className="form-control" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input type="email" placeholder="Email" id="email" 
                    className="form-control" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input type="password" placeholder="Mật khẩu" id="password" 
                    className="form-control" required onChange={handleChange} />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mb-3">Tạo tài khoản</button>
                
                <p className="text-center">
                  Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;