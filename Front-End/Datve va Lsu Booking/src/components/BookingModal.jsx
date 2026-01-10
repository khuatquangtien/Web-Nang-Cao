import React, { useState, useEffect } from 'react';
import { createBooking } from '../services/bookingService';
import './BookingModal.css';

const BookingModal = ({ tour, onClose }) => {
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("CASH");
    const [isLoading, setIsLoading] = useState(false);

    const CHILD_RATE = 0.5; // Trẻ em tính 50% giá

    useEffect(() => {
        if (tour) {
            const total = (numAdults * tour.price) + (numChildren * tour.price * CHILD_RATE);
            setTotalPrice(total);
        }
    }, [numAdults, numChildren, tour]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const bookingData = {
                tourId: tour.id,
                numAdults: parseInt(numAdults),
                numChildren: parseInt(numChildren),
                paymentMethod: paymentMethod
            };

            await createBooking(bookingData);
            alert("Đặt tour thành công! Vui lòng vào trang 'Lịch sử' để xem.");
            onClose();
        } catch (error) {
            console.error(error);
            alert(error.message || "Có lỗi xảy ra khi đặt vé!");
        } finally {
            setIsLoading(false);
        }
    };

    if (!tour) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Đặt Tour: {tour.title}</h3>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Người lớn ({tour.price.toLocaleString()} đ)</label>
                        <input 
                            type="number" min="1" 
                            value={numAdults}
                            onChange={(e) => setNumAdults(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Trẻ em (Giảm 50%)</label>
                        <input 
                            type="number" min="0" 
                            value={numChildren}
                            onChange={(e) => setNumChildren(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Thanh toán</label>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="CASH">Tiền mặt</option>
                            <option value="TRANSFER">Chuyển khoản</option>
                        </select>
                    </div>

                    <div className="total-price">
                        Tổng cộng: <span>{totalPrice.toLocaleString()} VND</span>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">Hủy</button>
                        <button type="submit" className="btn-primary" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "XÁC NHẬN ĐẶT"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;