import React, { useState } from 'react';
import BookingModal from '../components/BookingModal'; // Import Modal vừa làm

const TourDetail = () => {
    // Này là dữ liệu mẫu để t test
    const tourData = {
        id: 1,
        title: "Du lịch Đà Nẵng - Hội An",
        price: 5000000,
        // ...
    };

    const [showBookingModal, setShowBookingModal] = useState(false);

    
    const handleOpenBooking = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập để đặt vé!");
            // window.location.href = '/login'; (Nếu muốn chuyển hướng)
            return;
        }
        setShowBookingModal(true);
    };

    return (
        <div className="tour-detail-container">
            <h1>{tourData.title}</h1>
            <p>Giá: {tourData.price.toLocaleString()} đ</p>
            
            <button onClick={handleOpenBooking} className="btn-book-now">
                ĐẶT NGAY
            </button>

            {showBookingModal && (
                <BookingModal 
                    tour={tourData} 
                    onClose={() => setShowBookingModal(false)} 
                />
            )}
        </div>
    );
};

export default TourDetail;