import React, { useEffect, useState } from 'react';
import { getBookingsByUserId } from '../services/bookingService';
import './BookingHistory.css'; 

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Giả lập lấy ID từ localStorage
        const userId = localStorage.getItem("userId") || 1; 

        const fetchHistory = async () => {
            try {
                const data = await getBookingsByUserId(userId);
                setBookings(data);
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const renderStatus = (status) => {
        if(status === 'CONFIRMED') return <span className="badge success">Đã xác nhận</span>;
        if(status === 'PENDING') return <span className="badge warning">Đang chờ duyệt</span>;
        return <span className="badge danger">Đã hủy</span>;
    };

    if (loading) return <div className="loading">Đang tải dữ liệu...</div>;

    return (
        <div className="history-container">
            <h2>Lịch sử đặt tour của tôi</h2>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Tên Tour</th>
                        <th>Ngày đặt</th>
                        <th>Số khách</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((item) => (
                        <tr key={item.id}>
                            <td>#{item.id}</td>
                            <td>{item.tourName}</td>
                            <td>{item.bookingDate}</td>
                            <td>{item.numPeople} người</td>
                            <td className="price">{item.totalPrice.toLocaleString()} đ</td>
                            <td>{renderStatus(item.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingHistory;