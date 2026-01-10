import axios from 'axios';

// Đường dẫn API (Sửa lại port 8080 nếu backend của m khác)
const API_URL = "http://localhost:8080/api/bookings";

export const createBooking = async (bookingData) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Bạn cần đăng nhập để đặt vé!");
    }

    // Gọi API POST kèm theo Token trong Header 
    const response = await axios.post(API_URL, bookingData, {
        headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        }
    });

    return response.data;
};