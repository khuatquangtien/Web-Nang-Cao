import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm helper để format giá tiền (VD: 150000 -> 150,000đ)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi mới vào
    axios
      .get(`http://localhost:9090/tours/${id}`)
      .then((res) => {
        setTour(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center my-5 py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  
  if (!tour) return (
      <div className="container text-center my-5 py-5">
        <h3 className="text-danger">Không tìm thấy thông tin tour này!</h3>
        <Link to="/home" className="btn btn-outline-secondary mt-3">Quay lại trang chủ</Link>
      </div>
    );

  return (
    <section className="py-5 bg-light">
        <div className="container">
            {/* Phần tiêu đề và địa điểm phía trên */}
            <div className="row mb-4">
                <div className="col-12">
                    <h1 className="fw-bold text-dark mb-2">{tour.title}</h1>
                    <div className="d-flex align-items-center text-muted">
                        <span className="me-3"><i className="bi bi-geo-alt-fill text-danger"></i> {tour.address}, {tour.city}</span>
                        {/* Bạn có thể thêm đánh giá sao ở đây nếu có dữ liệu */}
                        <span><i className="bi bi-star-fill text-warning"></i> 5.0 (Rất tốt)</span>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* CỘT BÊN TRÁI: ẢNH VÀ MÔ TẢ (Chiếm 8 phần) */}
                <div className="col-lg-8">
                    {/* Ảnh đại diện to đẹp */}
                    <div className="rounded-3 overflow-hidden shadow-sm mb-4 position-relative" style={{height: "500px"}}>
                        <img
                            src={tour.image || "https://via.placeholder.com/1200x600?text=Đang+cập+nhật+ảnh"}
                            className="w-100 h-100"
                            style={{objectFit: "cover", objectPosition: "center"}}
                            alt={tour.title}
                        />
                        {tour.featured && <span className="position-absolute top-0 start-0 bg-warning text-dark fw-bold px-3 py-1 m-3 rounded">Nổi bật</span>}
                    </div>

                    {/* Phần mô tả chi tiết */}
                    <div className="bg-white p-4 rounded-3 shadow-sm">
                        <h3 className="fw-bold mb-3">Giới thiệu</h3>
                        <p className="card-text" style={{whiteSpace: "pre-line", lineHeight: "1.6", color: "#555"}}>
                            {tour.description || "Chưa có mô tả chi tiết cho tour này."}
                        </p>

                        <hr className="my-4"/>
                        
                        <h5 className="fw-bold mb-3">Thông tin thêm</h5>
                        <div className="row gx-3 gy-2">
                            <div className="col-sm-6 col-md-4">
                                <div className="d-flex align-items-center p-3 border rounded bg-light">
                                    <i className="bi bi-people-fill fs-3 text-primary me-3"></i>
                                    <div>
                                        <small className="text-muted d-block">Số khách tối đa</small>
                                        <strong>{tour.maxGroupSize ? `${tour.maxGroupSize} người` : "Liên hệ"}</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                 <div className="d-flex align-items-center p-3 border rounded bg-light">
                                    <i className="bi bi-clock-history fs-3 text-success me-3"></i>
                                    <div>
                                        <small className="text-muted d-block">Thời gian</small>
                                        <strong>Trong ngày (Ví dụ)</strong>
                                    </div>
                                </div>
                            </div>
                             {/* Thêm các thông tin khác nếu có */}
                        </div>
                    </div>
                </div>

                {/* CỘT BÊN PHẢI: THẺ ĐẶT VÉ (Chiếm 4 phần, dính khi cuộn) */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm sticky-top" style={{top: "20px", zIndex: 1}}>
                        <div className="card-body p-4">
                            <h5 className="card-title text-muted mb-3">Giá tham khảo</h5>
                            <div className="d-flex align-items-end mb-4">
                                <h2 className="text-primary fw-bold mb-0 me-2">
                                    {tour.price ? formatPrice(tour.price) : "Liên hệ"}
                                </h2>
                                <span className="text-muted">/ khách</span>
                            </div>

                            <div className="d-grid gap-2">
                                {/* Nút Đặt Ngay - Dẫn sang trang Booking */}
                                <Link
                                    to="/booking"
                                    state={{ tour: tour }}
                                    className="btn btn-primary btn-lg py-3 fw-bold rounded-pill"
                                >
                                    <i className="bi bi-ticket-perforated-fill me-2"></i> Đặt ngay vé này
                                </Link>
                                
                                <Link to="/home" className="btn btn-outline-secondary py-2 rounded-pill mt-2">
                                    <i className="bi bi-arrow-left me-2"></i> Xem tour khác
                                </Link>
                            </div>
                             <p className="text-center text-muted mt-3 mb-0"><small><i className="bi bi-shield-check"></i> Đảm bảo giá tốt nhất</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default TourDetail;