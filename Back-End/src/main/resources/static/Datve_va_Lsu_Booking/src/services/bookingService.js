import axios from 'axios';

// Đường dẫn API (Sửa port 8080 nếu backend của m khác)
const API_URL = "http://localhost:8080/api/bookings";

export const createBooking = async (bookingData) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Bạn cần đăng nhập để đặt vé!");
    }

    // Gọi API thật
    const response = await axios.post(API_URL, bookingData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return response.data;
};

export const getBookingsByUserId = async (userId) => {
    // Vì chưa có Backend trả về list này, t làm cái ví dụ để m thấy bảng hiện ra
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 101,
                    tourName: "Du lịch Đà Nẵng - Hội An 3N2Đ",
                    bookingDate: "2024-06-15",
                    totalPrice: 5000000,
                    status: "PENDING", // Đang chờ duyệt
                    numPeople: 2
                },
                {
                    id: 102,
                    tourName: "Khám phá Hà Giang mùa lúa chín",
                    bookingDate: "2024-05-20",
                    totalPrice: 3500000,
                    status: "CONFIRMED", // Đã xác nhận
                    numPeople: 1
                },
                {
                    id: 105,
                    tourName: "Tour nghỉ dưỡng Phú Quốc",
                    bookingDate: "2024-01-10",
                    totalPrice: 12000000,
                    status: "CANCELLED", // Đã hủy
                    numPeople: 4
                }
            ]);
        }, 800); // Giả vờ đợi 0.8s như mạng thật
    });
};