import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header"; // Đảm bảo đường dẫn đúng

// Import các trang
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import TourDetail from "./pages/TourDetail";
import Booking from "./pages/Booking";
import ThankYou from "./pages/ThankYou"; // <--- 1. Import vào đây
import Admin from "./pages/Admin/Admin";
import CustomerManager from "./pages/Admin/CustomerManager"; // <--- 2. Import vào đâyq
import ForgetPassword from "./pages/ForgetPassword";
import TourManager from "./pages/Admin/TourManager"; // <--- 3. Import vào đây
import AddTour from "./pages/Admin/AddTour"; // <--- 4. Import vào đây
import HotelPage from "./pages/HotelPage"; // <--- 5. Import vào đây
import HotelDetail from "./pages/HotelDetail"; // Nhớ import ở đầu file nhé
import DashBoard from "./pages/Admin/Dashboard"; // <--- 6. Import vào đây

const MainLayout = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};
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
