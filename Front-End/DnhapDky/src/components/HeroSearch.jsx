import React from 'react';

const HeroSearch = () => {
  return (
    <>
      {/* Banner nền xanh */}
      <div className="hero-banner">
        <h1 className="hero-title">Du lịch dễ dàng khắp mọi nơi cùng Trip.com</h1>
        <p className="hero-subtitle">
            <i className="bi bi-check"></i> Thanh Toán An Toàn | 
            <i className="bi bi-check"></i> Hỗ trợ toàn quốc 24/7
        </p>

        {/* Hộp tìm kiếm màu trắng nằm đè lên hoặc bên trong */}
        <div className="search-box">
          
          {/* Tabs trên cùng */}
          <div className="search-tabs">
            <div className="search-tab-item"><i className="bi bi-building"></i> Khách sạn</div>
            <div className="search-tab-item"><i className="bi bi-airplane"></i> Vé Máy Bay</div>
            <div className="search-tab-item active"><i className="bi bi-globe"></i> Tour & Vé tham quan</div>
          </div>

          {/* Form nhập liệu */}
          <div className="search-inputs">
            <div className="search-input-group">
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#666'}}>ĐIỂM ĐẾN</label>
                <input type="text" placeholder="Bạn muốn đi đâu? (Hạ Long...)" />
            </div>
            <div className="search-input-group">
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#666'}}>NGÀY KHỞI HÀNH</label>
                <input type="date" />
            </div>
             <div className="search-input-group">
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#666'}}>KHÁCH</label>
                <select>
                    <option>2 Người lớn, 0 Trẻ em</option>
                </select>
            </div>
            <button className="search-btn">
                <i className="bi bi-search"></i> TÌM KIẾM
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSearch;