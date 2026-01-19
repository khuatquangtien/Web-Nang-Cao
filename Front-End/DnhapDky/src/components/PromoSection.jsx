import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../App.css";

// Bạn cần có file ảnh png người du lịch, hoặc dùng link ảnh mạng
const maleTourist =
  "https://github.com/do-an-k14/travel-booking-system/blob/main/frontend/src/assets/images/male-tourist.png?raw=true";

const PromoSection = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Đăng ký ngay để nhận thông tin du lịch hữu ích.</h2>

              <div className="newsletter__input">
                <input type="email" placeholder="Nhập email của bạn" />
                <button className="btn newsletter__btn">Đăng ký</button>
              </div>

              <p>
                Nhận ngay các ưu đãi độc quyền, bí kíp du lịch và cập nhật mới
                nhất từ Trip.com gửi thẳng vào hộp thư của bạn.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="promo-tourist" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PromoSection;
