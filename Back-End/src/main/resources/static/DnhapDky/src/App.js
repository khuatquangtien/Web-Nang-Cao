import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"; 
import Header from "./components/Header";

// Import các trang
import Home from "./pages/Home"; 
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import MyBookings from "./pages/MyBookings";
import ThankYou from "./pages/ThankYou";
import Booking from "./pages/Booking";
import AdminBlog from './pages/AdminBlog';
import AdminTour from './pages/AdminTour';
import AdminTourForm from './pages/AdminTourForm';
import AdminDashboard from './pages/AdminDashboard';

// --- QUAN TRỌNG: Nhớ import trang chi tiết ---
import TourDetail from "./pages/TourDetail"; 

const MainLayout = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh" }}>
         <Outlet /> 
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* === NHÓM 1: CÁC TRANG CÓ HEADER === */}
        <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} /> {/* Đề phòng redirect về /home */}
            <Route path="/my-bookings" element={<MyBookings />} />
            
            {/* --- ĐÃ SỬA: Bỏ comment dòng này để nó hoạt động --- */}
            <Route path="/tours/:id" element={<TourDetail />} /> 
            <Route path="/booking" element={<Booking />} />
            <Route path="/thank-you" element={<ThankYou />} />
        </Route>

        {/* === NHÓM 2: CÁC TRANG KHÔNG CÓ HEADER === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin/blog' element={<AdminBlog />} />
        <Route path="/admin/tour" element={<AdminTour />} />
        <Route path="/admin/tour/add" element={<AdminTourForm />} />
        <Route path="/admin/tour/edit/:id" element={<AdminTourForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;