import { useEffect, useState } from "react";
import { getMyBookings } from "../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

useEffect(() => {
  if (token) { 
    getMyBookings(token).then((res) => {
      setBookings(res.data);
    });
  }
}, [token]); 

  return (
    <div>
      <h2>Lịch sử đặt tour</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Tour</th>
            <th>Số người</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.tour.title}</td>
              <td>{b.numAdults}</td>
              <td>{b.totalPrice}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyBookings;
