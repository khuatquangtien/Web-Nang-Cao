import React, { useState } from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { BASE_URL } from "../utils/config";
import '../styles/tour-reviews.css'; // File CSS tuỳ chỉnh (nếu cần)

const TourReviews = ({ tourId, existingReviews }) => {
  const [reviews, setReviews] = useState(existingReviews || []);
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      alert("Vui lòng đăng nhập để đánh giá tour!");
      return;
    }

    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }
    if (!comment.trim()) {
      alert("Vui lòng nhập cảm nghĩ của bạn!");
      return;
    }

    // ĐÃ SỬA: Cấu trúc object gửi đi KHỚP 100% với file Review.java bên Spring Boot
    const reviewObj = {
      tourid: tourId, // Gửi trực tiếp id của tour thay vì gửi cục Object
      rating: rating,
      comment: comment,
      username: user.fullName || user.username || "Khách", 
    };

    try {
      // Lưu ý: Đường dẫn API này phải khớp với cấu hình trong ReviewController của bạn
      const res = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Có lỗi xảy ra khi gửi đánh giá!");
      } else {
        setReviews([...reviews, reviewObj]); 
        setRating(0);
        setComment("");
        alert("Cảm ơn bạn đã đánh giá!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối Server: " + err.message);
    }
  };
  return (
    <div className="tour__reviews mt-4">
      <h4>Đánh giá ({reviews.length} reviews)</h4>

      {/* --- FORM ĐÁNH GIÁ --- */}
      <Form onSubmit={submitHandler}>
        <div className="d-flex align-items-center gap-3 mb-3 rating__group">
          {/* Render 5 ngôi sao */}
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              onClick={() => setRating(star)}
              style={{ cursor: "pointer", color: "var(--secondary-color)", fontSize: "1.2rem" }}
            >
              <i className={star <= rating ? "bi bi-star-fill text-warning" : "bi bi-star"}></i>
            </span>
          ))}
        </div>

        <div className="review__input d-flex align-items-center justify-content-between">
          <input
            type="text"
            placeholder="Chia sẻ cảm nghĩ..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
            style={{ borderRadius: "20px", padding: "10px 20px" }}
          />
          <Button 
            className="btn primary__btn text-white ms-3" 
            style={{ borderRadius: "20px", backgroundColor: "#ffc107", border: "none" }}
            type="submit"
          >
            Gửi
          </Button>
        </div>
      </Form>

      {/* --- HIỂN THỊ DANH SÁCH ĐÁNH GIÁ CŨ --- */}
      <ListGroup className="user__reviews mt-5">
        {reviews?.map((review, index) => (
          <div className="review__item mb-4 pb-3 border-bottom" key={index}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-0">{review.username}</h6>
                <p className="mb-0 mt-1">{review.comment}</p>
              </div>
              <span className="d-flex align-items-center text-warning">
                {review.rating} <i className="bi bi-star-fill ms-1"></i>
              </span>
            </div>
          </div>
        ))}
      </ListGroup>
    </div>
  );
};

export default TourReviews;