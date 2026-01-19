import { useEffect, useState } from 'react';
import axios from 'axios'; // Nhớ cài: npm install axios
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Gọi API khi trang vừa load
    useEffect(() => {
        axios.get('http://localhost:9090/tours')
            .then(res => {
                setTours(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Không thể kết nối đến Server!");
                setLoading(false);
            });
    }, []);

    // 2. Logic Tìm kiếm (Sẽ dùng ở Bước 3)
    const [keyword, setKeyword] = useState("");
    const handleSearch = () => {
        axios.get(`http://localhost:9090/tours/search?keyword=${keyword}`)
            .then(res => setTours(res.data))
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4">
            {/* --- PHẦN BANNER & TÌM KIẾM --- */}
            <div className="bg-primary p-5 text-white rounded mb-4">
                <h1>Du lịch dễ dàng cùng Trip.com Clone</h1>
                <div className="card p-3 text-dark mt-3">
                    <div className="row g-2">
                        <div className="col-md-8">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Bạn muốn đi đâu? (Hà Nội, Sa Pa...)"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-primary w-100" onClick={handleSearch}>
                                🔍 Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- PHẦN DANH SÁCH TOUR --- */}
            <h2 className="mb-3">Tour du lịch nổi bật</h2>
            
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="row">
                {tours.map((tour) => (
                    <div className="col-md-4 mb-4" key={tour.id}>
                        <div className="card h-100 shadow-sm">
                            {/* Nếu có ảnh thì hiện, không có thì dùng ảnh mẫu */}
                            <img 
                                src="https://via.placeholder.com/300x200" 
                                className="card-img-top" 
                                alt={tour.title} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{tour.title}</h5>
                                <p className="card-text text-muted">
                                    <i className="bi bi-geo-alt-fill"></i> {tour.destination}
                                </p>
                                <p className="card-text text-truncate">{tour.description}</p>
                                <h5 className="text-primary">
                                    {tour.price.toLocaleString()} VND
                                </h5>
                                <Link to={`/tours/${tour.id}`} className="btn btn-outline-primary w-100 mt-2">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;