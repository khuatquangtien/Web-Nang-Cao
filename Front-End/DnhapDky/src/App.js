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
        </Route>

        {/* === NHÓM 2: CÁC TRANG KHÔNG CÓ HEADER (Riêng lẻ) === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customers" element={<CustomerManager />} />
        <Route path="/tourManager" element={<TourManager />} />
        <Route path="/admin/tours/add" element={<AddTour />} />
        {/* Trang Booking (nếu cần header thì đưa lên trên, nếu không thì để đây) */}
        {/* Thường booking cũng cần biết đang book tour nào, nên đặt là /tours/:id/book */}
        <Route path="/tours/:id/book" element={<Booking />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/hotels" element={<HotelPage />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
