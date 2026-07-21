import React from 'react';
import Header from '../components/Header';       // Gọi Header có sẵn của bạn
import SearchBar from '../components/SearchBar'; // Gọi thanh tìm kiếm có sẵn
import AllToursList from '../components/AllToursList'; // Gọi cụm danh sách tour

const TourPage = () => {
  return (
    <div className="tour-page-container" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* 1. Thanh điều hướng Header phía trên cùng */}
      <Header />

      {/* Khung nội dung chính của trang */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        {/* 2. Khu vực thanh tìm kiếm để khách lọc tour */}
        <div style={{ marginBottom: '30px', marginTop: '10px' }}>
          <SearchBar />
        </div>

        {/* 3. Hiển thị danh sách tất cả các tour */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <AllToursList />
        </div>

      </div>
    </div>
  );
};

export default TourPage;