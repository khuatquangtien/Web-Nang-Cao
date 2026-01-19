import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

// Nhận prop onSearch từ Home.jsx
const HeroSearch = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState("tour"); // Mặc định chọn Tour

  // 1. Khai báo Refs để lấy giá trị từ Input
  const locationRef = useRef("");
  const dateRef = useRef("");
  const maxGroupSizeRef = useRef(0);

  // 2. Hàm xử lý khi bấm nút Tìm kiếm
  const searchHandler = () => {
    // Với Reactstrap Input, ta dùng ref.current.value để lấy dữ liệu
    const location = locationRef.current.value;
    const date = dateRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" && date === "" && maxGroupSize === "") {
      return alert("Vui lòng nhập đầy đủ thông tin (Địa điểm, ngày, số khách)!");
    }

    // Gửi dữ liệu về Home.jsx để xử lý hiển thị
    onSearch({ location, date, maxGroupSize });
  };

  return (
    <>
      {/* === BANNER === */}
      <div className="trip-hero" style={{position: 'relative', height: '400px', display: 'flex', alignItems: 'center', color: '#fff', background: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3) no-repeat center center/cover'}}>
        <div className="trip-hero-overlay" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)'}}></div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <h1 className="fw-bold mb-2 display-4">
            Du lịch dễ dàng khắp mọi nơi cùng Trip.com
          </h1>
          <p className="fs-5">
            <i className="bi bi-shield-check text-success me-1"></i> Thanh Toán An Toàn |{" "}
            <i className="bi bi-headset text-success ms-3 me-1"></i> Hỗ trợ toàn quốc 24/7
          </p>
        </Container>
      </div>

      {/* === SEARCH BOX (Đè lên banner) === */}
      <Container style={{marginTop: '-60px', position: 'relative', zIndex: 3}}>
        <div className="search-container bg-white rounded-4 shadow-lg p-4">
          
          {/* Tabs: Khách sạn, Vé máy bay... */}
          <div className="search-tabs d-flex gap-4 mb-4 border-bottom pb-2">
            <div
              className={`search-tab cursor-pointer fw-bold pb-2 ${activeTab === "hotel" ? "text-primary border-bottom border-primary border-3" : "text-muted"}`}
              onClick={() => setActiveTab("hotel")}
              style={{cursor: 'pointer'}}
            >
              <i className="bi bi-buildings"></i> Khách Sạn
            </div>
            <div
              className={`search-tab cursor-pointer fw-bold pb-2 ${activeTab === "flight" ? "text-primary border-bottom border-primary border-3" : "text-muted"}`}
              onClick={() => setActiveTab("flight")}
              style={{cursor: 'pointer'}}
            >
              <i className="bi bi-airplane"></i> Vé Máy Bay
            </div>
            <div
              className={`search-tab cursor-pointer fw-bold pb-2 ${activeTab === "tour" ? "text-primary border-bottom border-primary border-3" : "text-muted"}`}
              onClick={() => setActiveTab("tour")}
              style={{cursor: 'pointer'}}
            >
              <i className="bi bi-geo-alt"></i> Tour & Vé tham quan
            </div>
          </div>

          {/* Form tìm kiếm */}
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row className="align-items-end">
              <Col lg="4">
                <FormGroup>
                  <Label className="fw-bold text-muted small mb-1"><i className="bi bi-map me-1"></i>ĐIỂM ĐẾN</Label>
                  <Input
                    type="text"
                    innerRef={locationRef} // Gắn ref vào đây
                    placeholder="Bạn muốn đi đâu? (Hạ Long...)"
                    bsSize="lg"
                    className="bg-light border-0"
                  />
                </FormGroup>
              </Col>
              
              <Col lg="3">
                <FormGroup>
                  <Label className="fw-bold text-muted small mb-1">
                    <i className="bi bi-calendar-event me-1"></i>NGÀY ĐI
                  </Label>
                  <Input 
                    type="date" 
                    innerRef={dateRef} // Gắn ref vào đây
                    bsSize="lg" 
                    className="bg-light border-0"
                  />
                </FormGroup>
              </Col>
              
              <Col lg="3">
                <FormGroup>
                  <Label className="fw-bold text-muted small mb-1"><i className="bi bi-people me-1"></i>SỐ KHÁCH</Label>
                  {/* Chuyển thành type number để dễ xử lý logic tìm kiếm */}
                  <Input 
                    type="number" 
                    innerRef={maxGroupSizeRef} // Gắn ref vào đây
                    bsSize="lg" 
                    placeholder="0" 
                    min="1"
                    className="bg-light border-0"
                  />
                </FormGroup>
              </Col>
              
              <Col lg="2">
                <Button
                  color="primary"
                  className="w-100 fw-bold py-3 fs-6 rounded-3 shadow-sm"
                  onClick={searchHandler} // Gọi hàm search khi click
                >
                  <i className="bi bi-search me-1"></i> TÌM KIẾM
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default HeroSearch;