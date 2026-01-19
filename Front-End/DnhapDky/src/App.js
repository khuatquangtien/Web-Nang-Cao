import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"; 
import Header from "./components/Header"; // Đảm bảo đường dẫn đúng

// Import các trang
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import TourDetail from './pages/TourDetail';
import Booking from './pages/Booking';
import ThankYou from './pages/ThankYou'; // <--- 1. Import vào đây

// --- Layout chung (Có Header) ---
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
            <Route path='/thank-you' element={<ThankYou />} />
            {/* QUAN TRỌNG: Sửa đường dẫn này để khớp với TourCard */}
            {/* ":id" là cú pháp để nhận tham số động (ví dụ id=4) */}
            <Route path="/tours/:id" element={<TourDetail />} />
        </Route>


        {/* === NHÓM 2: CÁC TRANG KHÔNG CÓ HEADER (Riêng lẻ) === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Trang Booking (nếu cần header thì đưa lên trên, nếu không thì để đây) */}
        {/* Thường booking cũng cần biết đang book tour nào, nên đặt là /tours/:id/book */}
        <Route path="/tours/:id/book" element={<Booking />} />   
      </Routes>
    </BrowserRouter>
  );
}

export default App;