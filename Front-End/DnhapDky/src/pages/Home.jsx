import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import "../styles/home.css";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";  
const Home = () => {  
  const [tours, setTours] = useState([]);
  const [toursFeatured, setToursFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  // Logic lấy tất cả tour
  useEffect(() => {
    axios
      .get(`${BASE_URL}/tours`)
      .then((res) => {
        setTours(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Không thể kết nối đến Server!");
        setLoading(false);
      });
  }, []);

  // Logic lấy tour nổi bật
  useEffect(() => {
    axios
      .get(`${BASE_URL}/tours/search/getFeaturedTours`)
      .then((res) => {
        setToursFeatured(res.data);
        setLoadingFeatured(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorFeatured("Không thể kết nối đến Server!");
        setLoadingFeatured(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* --- CỘT TRÁI: SIDEBAR (Chiếm 3/12 phần chiều rộng) --- */}
        <div className="col-lg-3">
          <div className="sticky-top" style={{ top: "20px", zIndex: "1" }}>
            {/* Component Sidebar của bạn được đặt ở đây */}
            <Sidebar />
          </div>
        </div>

        {/* --- CỘT PHẢI: NỘI DUNG CHÍNH (Chiếm 9/12 phần chiều rộng) --- */}
        <div className="col-lg-9">
          
          {/* 1. SEARCH BAR */}
          <div className="mb-5">
            <SearchBar />
          </div>

          {/* 2. PHẦN TOUR NỔI BẬT */}
          <h2 className="mb-3 text-warning">Tour du lịch nổi bật</h2>
          {loadingFeatured && <p>Đang tải tour nổi bật...</p>}
          {errorFeatured && <p className="text-danger">{errorFeatured}</p>}

          <div className="row mb-5">
            {toursFeatured.map((tour) => (
              <div className="col-md-4 mb-4" key={tour.id}>
                <div className="card h-100 shadow-sm border-warning">
                  <div className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded">
                    Hot
                  </div>
                  <img
                    src={tour.image ? tour.image : ""}
                    className="card-img-top"
                    alt={tour.title}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{tour.title}</h5>
                    <p className="card-text text-muted">
                      <i className="bi bi-geo-alt-fill"></i> {tour.city || tour.destination}
                    </p>
                    <h5 className="text-primary">{tour.price} VNĐ</h5>
                    <Link to={`/tours/${tour.id}`} className="btn btn-primary w-100 mt-2">
                      Xem ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. DANH SÁCH TẤT CẢ TOUR */}
          <h2 className="mb-4">Khám phá tất cả các tour</h2>
          {loading && <p>Đang tải dữ liệu...</p>}
          {error && <p className="text-danger">{error}</p>}

          <div className="row">
            {tours.map((tour) => (
              <div className="col-md-4 mb-4" key={tour.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={tour.image ? tour.image : "https://via.placeholder.com/300x200"}
                    className="card-img-top"
                    alt={tour.title}
                    style={{ height: "150px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x200";
                    }}
                  />
                  <div className="card-body">
                    <h6 className="card-title text-truncate">{tour.title}</h6>
                    <p className="card-text text-muted small">
                      <i className="bi bi-geo-alt-fill"></i> {tour.city || tour.destination}
                    </p>
                    <p className="card-text text-success fw-bold">${tour.price}</p>
                    <Link to={`/tours/${tour.id}`} className="btn btn-outline-secondary btn-sm w-100">
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> 
        {/* Kết thúc cột phải */}
      </div> 
      {/* Kết thúc row */}
    </div>
  );
};

export default Home;