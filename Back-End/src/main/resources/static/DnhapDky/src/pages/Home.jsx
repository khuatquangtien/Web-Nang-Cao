import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios'; 
import { BASE_URL } from '../utils/config'; // Đảm bảo đường dẫn đúng tới file config của bạn

// Components
import Sidebar from '../components/Sidebar';
import HeroSearch from '../components/HeroSearch';
import FeaturedTourList from '../components/FeaturedTourList'; 
import AllToursList from '../components/AllToursList';
import TourCard from '../components/TourCard'; // Cần import để hiển thị kết quả tìm kiếm

import '../App.css';

const Home = () => {
    // 1. Khai báo State để quản lý việc tìm kiếm
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    // 2. Hàm xử lý logic gọi API tìm kiếm
    const handleSearch = async ({ location, date, maxGroupSize }) => {
        setIsSearching(true); // Bật trạng thái đang tìm kiếm

        const searchSize = maxGroupSize === "" ? 0 : maxGroupSize;
        try {
            // Gọi API xuống Backend
            // Lưu ý: Đảm bảo Backend của bạn có API này
            const res = await axios.get(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&date=${date}&maxGroupSize=${maxGroupSize}`);
            
            if (res.data.success) {
                setSearchResults(res.data.data);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
            setSearchResults([]);
        }
    };

    // Hàm để tắt chế độ tìm kiếm, quay về trang chủ
    const clearSearch = () => {
        setIsSearching(false);
        setSearchResults([]);
    };

    return (
        <div className="container-fluid p-0"> {/* Full width */}
            <Row className="g-0">
                {/* --- CỘT TRÁI: SIDEBAR --- */}
                <Col lg='2' className="d-none d-lg-block" style={{ minHeight: '100vh', borderRight: '1px solid #ddd' }}>
                    <Sidebar />
                </Col>

                {/* --- CỘT PHẢI: NỘI DUNG CHÍNH --- */}
                <Col lg='10' style={{ backgroundColor: '#f5f7fa' }}>

                    {/* 1. Banner + Search Box */}
                    {/* QUAN TRỌNG: Truyền hàm handleSearch xuống component con */}
                    <HeroSearch onSearch={handleSearch} />

                    {/* 2. Container chứa nội dung dưới */}
                    <Container className="pb-5">
                        
                        {/* LOGIC HIỂN THỊ CÓ ĐIỀU KIỆN */}
                        {isSearching ? (
                            /* --- TRƯỜNG HỢP 1: ĐANG TÌM KIẾM --- */
                            <div className="mt-5">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="fw-bold">Kết quả tìm kiếm ({searchResults.length})</h3>
                                    <button 
                                        onClick={clearSearch} 
                                        className="btn btn-outline-danger btn-sm"
                                    >
                                        <i className="bi bi-x-circle"></i> Xóa tìm kiếm
                                    </button>
                                </div>
                                <Row>
                                    {searchResults.length === 0 ? (
                                        <h5 className="text-muted text-center py-5">Không tìm thấy tour nào phù hợp!</h5>
                                    ) : (
                                        searchResults.map(tour => (
                                            <Col lg="3" md="6" className="mb-4" key={tour._id}>
                                                <TourCard tour={tour} />
                                            </Col>
                                        ))
                                    )}
                                </Row>
                            </div>
                        ) : (
                            /* --- TRƯỜNG HỢP 2: HIỂN THỊ MẶC ĐỊNH --- */
                            <>
                                {/* 3. Danh sách Tour Nổi Bật */}
                                <div className="mt-5">
                                    <h2 className="mb-4 fw-bold">Tour du lịch nổi bật</h2>
                                    <Row>
                                        <FeaturedTourList />
                                    </Row>
                                </div>

                                {/* 4. Danh sách tất cả các tour */}
                                <div className="mt-5">
                                    <h3 className="mb-4 fw-bold">Danh sách tất cả Tour</h3>
                                    <Row>
                                        <AllToursList />
                                    </Row>
                                </div>
                            </>
                        )}

                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default Home;