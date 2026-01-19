// src/components/FeaturedTourList.jsx
import React, { useState, useEffect } from "react";
import TourCard from "./TourCard";
import { Col } from "reactstrap";
import axios from "axios";

const FeaturedTourList = () => {
  const [featuredTours, setFeaturedTours] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9090/tours")
      .then(res => {
        const data = res.data.content ? res.data.content : res.data;
        
        // --- QUAN TRỌNG: CHỈ LỌC RA TOUR CÓ FEATURED = TRUE ---
        const featured = data.filter(tour => tour.featured === true);
        setFeaturedTours(featured);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {featuredTours.map((tour) => (
        <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;