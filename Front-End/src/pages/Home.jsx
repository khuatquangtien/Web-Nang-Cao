import React from "react";
import "../styles/home.css";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import FeaturedTours from "../components/FeaturedTours";
import AllTours from "../components/AllTours";
import FeaturedHotels from "../components/FeaturedHotels"; // 👈 Dùng component khách sạn nổi bật có nút Xem tất cả

const Home = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* --- CỘT TRÁI: SIDEBAR (Chiếm 3/12 phần chiều rộng) --- */}
        <div className="col-lg-3">
          <div className="sticky-top" style={{ top: "20px", zIndex: "1" }}>
            <Sidebar />
          </div>
        </div>

        {/* --- CỘT PHẢI: NỘI DUNG CHÍNH (Chiếm 9/12 phần chiều rộng) --- */}
        <div className="col-lg-9">
          {/* 1. THANH TÌM KIẾM */}
          <div className="mb-5">
            <SearchBar />
          </div>

          {/* 2. TOUR DU LỊCH NỔI BẬT */}
          <FeaturedTours />

          {/* 3. TẤT CẢ TOUR (HÀNH TRÌNH MỚI) */}
          <AllTours />

          {/* 4. KHÁCH SẠN VÀ CHỖ NGHỈ NỔI BẬT (KÈM NÚT XEM TẤT CẢ) */}
          <FeaturedHotels />
        </div>
      </div>
    </div>
  );
};

export default Home;
