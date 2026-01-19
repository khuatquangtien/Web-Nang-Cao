import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

const PromoSection = () => {
  return (
    <div className="mt-5">
      <h3 className="mb-4 fw-bold">Dành riêng cho người dùng mới</h3>
      <Row>
         <Col md='4'>
            <Card className="border-0 shadow-sm mb-3">
               <CardBody className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                     <i className="ri-coupon-3-fill fs-2"></i>
                  </div>
                  <div>
                     <h6 className="fw-bold m-0">Giảm giá đến 10%</h6>
                     <p className="text-muted small m-0">Vé máy bay | Chỉ dành cho ứng dụng</p>
                     <button className="btn btn-sm btn-primary mt-2">Nhận Ngay</button>
                  </div>
               </CardBody>
            </Card>
         </Col>
         <Col md='4'>
            <Card className="border-0 shadow-sm mb-3">
               <CardBody className="d-flex align-items-center gap-3">
                  <div className="bg-danger bg-opacity-10 p-3 rounded-circle text-danger">
                     <i className="ri-hotel-fill fs-2"></i>
                  </div>
                  <div>
                     <h6 className="fw-bold m-0">Giảm giá 5%</h6>
                     <p className="text-muted small m-0">Khách sạn nội địa</p>
                     <button className="btn btn-sm btn-primary mt-2">Nhận Ngay</button>
                  </div>
               </CardBody>
            </Card>
         </Col>
      </Row>
    </div>
  );
};
export default PromoSection;
