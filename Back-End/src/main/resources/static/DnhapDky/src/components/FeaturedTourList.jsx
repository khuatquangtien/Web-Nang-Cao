import React from "react";
import TourCard from "./TourCard";
import { Col } from "reactstrap";
import useFetch from "../hooks/useFetch";

// URL Backend của bạn
const BASE_URL = "http://localhost:9090/tours";

const FeaturedTourList = () => {
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/search/getFeaturedTours`);

  return (
    <>
      {loading && <h4>Đang tải dữ liệu...</h4>}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredTours?.map((tour) => (
          <Col lg="3" md="6" className="mb-4" key={tour.id}>
            <TourCard tour={tour} />
          </Col>
        ))}
    </>
  );
};
export default FeaturedTourList;
