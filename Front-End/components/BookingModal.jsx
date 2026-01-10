import { useState } from "react";
import { createBooking } from "../services/bookingService";

function BookingModal({ tour }) {
  const [numPeople, setNumPeople] = useState(1);
  const token = localStorage.getItem("token");

  const totalPrice = numPeople * tour.price;

  const handleBooking = async () => {
    if (!token) {
      alert("Vui lòng đăng nhập");
      return;
    }

    try {
      await createBooking(
        {
          tourId: tour.id,
          numAdults: numPeople,
          paymentMethod: "CASH"
        },
        token
      );

      alert("Đặt vé thành công");
    } catch {
      alert("Lỗi đặt vé");
    }
  };

  return (
    <div>
      <h3>Đặt tour: {tour.title}</h3>
      <input
        type="number"
        min="1"
        value={numPeople}
        onChange={(e) => setNumPeople(e.target.value)}
      />
      <p>Tạm tính: {totalPrice.toLocaleString()} VNĐ</p>
      <button onClick={handleBooking}>Xác nhận</button>
    </div>
  );
}

export default BookingModal;
