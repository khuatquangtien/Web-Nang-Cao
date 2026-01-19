import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

// Import ảnh icon (đảm bảo bạn có các ảnh này hoặc dùng link online)
const weatherImg =
  "https://raw.githubusercontent.com/do-an-k14/travel-booking-system/main/frontend/src/assets/images/weather.png";
const guideImg =
  "https://raw.githubusercontent.com/do-an-k14/travel-booking-system/main/frontend/src/assets/images/guide.png";
const customizationImg =
  "https://raw.githubusercontent.com/do-an-k14/travel-booking-system/main/frontend/src/assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Dự báo thời tiết",
    desc: "Cập nhật tình hình thời tiết chính xác tại điểm đến của bạn.",
  },
  {
    imgUrl: guideImg,
    title: "Hướng dẫn viên tốt nhất",
    desc: "Đội ngũ hướng dẫn viên chuyên nghiệp, nhiệt tình và am hiểu địa phương.",
  },
  {
    imgUrl: customizationImg,
    title: "Tùy chỉnh chuyến đi",
    desc: "Hỗ trợ thiết kế lịch trình tour riêng theo nhu cầu của khách hàng.",
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
