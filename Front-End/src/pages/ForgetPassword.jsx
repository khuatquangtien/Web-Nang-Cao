import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css"; // Tận dụng lại file CSS của trang login hoặc tạo file riêng

const ForgetPassword = () => {
  // Quản lý trạng thái
  const [step, setStep] = useState(1); // Bước 1: Gửi email, Bước 2: Nhập OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Quản lý UI
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:9090"; // URL Backend của bạn

  // --- Xử lý Bước 1: Gửi mã OTP ---
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email) {
      setErrorMsg("Vui lòng nhập email!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/forgetPass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        setSuccessMsg("Mã OTP đã được gửi đến email của bạn!");
        setStep(2); // Chuyển sang bước 2
      } else {
        const errText = await response.text();
        setErrorMsg(errText || "Không thể gửi mã OTP. Vui lòng thử lại!");
      }
    } catch (error) {
      setErrorMsg("Lỗi kết nối đến Server!");
    } finally {
      setLoading(false);
    }
  };

  // --- Xử lý Bước 2: Đổi mật khẩu ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!otp || !newPassword || !confirmPassword) {
      setErrorMsg("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          otp: otp,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
        navigate("/login"); // Chuyển hướng về trang đăng nhập
      } else {
        const errText = await response.text();
        setErrorMsg(errText || "Đổi mật khẩu thất bại!");
      }
    } catch (error) {
      setErrorMsg("Lỗi kết nối đến Server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {" "}
      {/* Dùng chung class container với form login cho đồng bộ */}
      <div
        className="login-card"
        style={{
          maxWidth: "450px",
          margin: "170px auto",
          padding: "30px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#0056b3" }}>
          Khôi phục mật khẩu
        </h3>

        {/* Hiển thị thông báo */}
        {errorMsg && (
          <div
            className="alert alert-danger"
            style={{ color: "red", marginBottom: "15px" }}
          >
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div
            className="alert alert-success"
            style={{ color: "green", marginBottom: "15px" }}
          >
            {successMsg}
          </div>
        )}

        {/* BƯỚC 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <p className="text-muted text-center mb-3">
              Nhập email đã đăng ký để nhận mã xác nhận.
            </p>
            <div className="form-group mb-3">
              <label>Địa chỉ Email</label>
              <input
                type="email"
                className="form-control w-100"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "10px", marginTop: "5px" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
              style={{
                padding: "10px",
                backgroundColor: "#0056b3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                width: "100%",
              }}
            >
              {loading ? "Đang gửi..." : "Gửi mã OTP"}
            </button>
          </form>
        )}

        {/* BƯỚC 2 */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group mb-3 mt-2">
              <label>Mã xác nhận (OTP)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập mã 5 số"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  padding: "10px",
                  marginTop: "5px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  padding: "10px",
                  marginTop: "5px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div className="form-group mb-4">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  padding: "10px",
                  marginTop: "5px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success w-100"
              style={{
                padding: "10px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                width: "100%",
              }}
            >
              {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
            </button>
          </form>
        )}

        <div
          className="mt-4 text-center"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#0056b3" }}
          >
            Quay lại trang Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
