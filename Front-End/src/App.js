import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

// 1. Nhóm Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";

// 2. Nhóm Tour
import TourPage from "./pages/Tour/TourPage";
import TourDetail from "./pages/Tour/TourDetail";

// 3. Nhóm Hotel
import HotelPage from "./pages/hotel/HotelPage";
import HotelDetail from "./pages/hotel/HotelDetail";

// 4. Nhóm Booking
import Booking from "./pages/booking/Booking";
import MyBookings from "./pages/booking/MyBookings";
import ThankYou from "./pages/booking/ThankYou";

// 5. Trang chủ & Admin
import Home from "./pages/Home";
import Admin from "./pages/Admin/Admin";
import CustomerManager from "./pages/Admin/CustomerManager";
import TourManager from "./pages/Admin/TourManager";
import AddTour from "./pages/Admin/AddTour";
import DashBoard from "./pages/Admin/Dashboard";
// --- THÊM COMPONENT PRIVATE ROUTE VÀO ĐÂY ---
const PrivateRoute = ({ children, requiredRole }) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  // Nếu chưa đăng nhập hoặc role không khớp -> Đẩy về trang đăng nhập
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return <Navigate to="/login" />;
  }
  // Nếu hợp lệ -> Cho phép xem component bên trong
  return children;
};
// --------------------------------------------

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === NHÓM 1: CÁC TRANG CÓ HEADER === */}
        <Route element={<MainLayout />}>
          {/* Chuyển hướng mặc định về home */}
          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="/home" element={<Home />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {/* QUAN TRỌNG: Sửa đường dẫn này để khớp với TourCard */}
          {/* ":id" là cú pháp để nhận tham số động (ví dụ id=4) */}
          <Route path="/tours" element={<TourPage />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/hotel" element={<HotelPage />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
        </Route>

        {/* === NHÓM 2: CÁC TRANG KHÔNG CÓ HEADER (Riêng lẻ) === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<PrivateRoute requiredRole={"ADMIN"}><Admin /></PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute requiredRole={"ADMIN"}><CustomerManager /></PrivateRoute>} />
        <Route path="/tourManager" element={<PrivateRoute requiredRole={"ADMIN"}><TourManager /></PrivateRoute>} />
        <Route path="/admin/tours/add" element={<PrivateRoute requiredRole={"ADMIN"}><AddTour /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute requiredRole={"ADMIN"}><DashBoard /></PrivateRoute>} />
        {/* Trang Booking (nếu cần header thì đưa lên trên, nếu không thì để đây) */}
        {/* Thường booking cũng cần biết đang book tour nào, nên đặt là /tours/:id/book */}
        <Route path="/tours/:id/book" element={<Booking />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
