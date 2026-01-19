// src/components/AllToursList.jsx
import React, { useState, useEffect } from "react";
import TourCard from "./TourCard";
import { Col } from "reactstrap";
import axios from "axios";

const AllToursList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    // Gọi API lấy TẤT CẢ tour
    axios
      .get("http://localhost:9090/tours")
      .then((res) => {
        // Xử lý dữ liệu trả về (tùy backend trả về mảng hay object content)
        const data = res.data.content ? res.data.content : res.data;
        setTours(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {tours.map((tour) => (
        <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default AllToursList;
