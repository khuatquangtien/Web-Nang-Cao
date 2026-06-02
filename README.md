WEBSITE QUẢN LÝ VÀ ĐẶT TOUR DU LỊCH
Giới thiệu đề tài

Website Quản lý và Đặt Tour Du lịch là hệ thống hỗ trợ khách hàng tìm kiếm, lựa chọn và đặt các tour du lịch trực tuyến một cách nhanh chóng và thuận tiện. Hệ thống đồng thời hỗ trợ doanh nghiệp du lịch quản lý tour, 
khách hàng, đơn đặt tour và thống kê doanh thu.

Mục tiêu của hệ thống là số hóa quy trình kinh doanh du lịch, giúp khách hàng dễ dàng tiếp cận các dịch vụ du lịch và giúp doanh nghiệp nâng cao hiệu quả quản lý.

Chức năng chính
Đối với khách hàng

•	Đăng ký tài khoản
•	Đăng nhập hệ thống
•	Xem danh sách tour du lịch
•	Xem chi tiết tour
•	Tìm kiếm và lọc tour theo nhiều tiêu chí
•	Đặt tour trực tuyến
•	Thanh toán trực tuyến
•	Xem lịch sử đặt tour
•	Theo dõi trạng thái đơn hàng
•	Cập nhật thông tin cá nhân
•	Nhận email xác nhận sau khi đặt tour thành công

Đối với quản trị viên
•	Quản lý tour du lịch
•	Quản lý nhân viên
•	Quản lý khách hàng
•	Quản lý đơn đặt tour
•	Quản lý trạng thái thanh toán
•	Quản lý tài khoản hệ thống
•	Thống kê doanh thu
•	Thống kê số lượng booking
•	Theo dõi hoạt động hệ thống

Thành viên thực hiện
STT	Họ và tên	MSSV	Nhiệm vụ
1	Khuất Quang Tiến	23810310413	Nhóm trưởng
2	Nguyễn Huy Hoàng	23810310410	Thành viên
3	Nguyễn Minh Hiếu	23810310407	Thành viên

Phân công nhiệm vụ
Khuất Quang Tiến
•	Phân tích yêu cầu hệ thống
•	Thiết kế cơ sở dữ liệu
•	Xây dựng Backend API
•	Xử lý đăng nhập và đăng ký
•	Quản lý tài khoản
Nguyễn Minh Hiếu
•	Thiết kế giao diện React
•	Xây dựng trang chủ
•	Xây dựng trang danh sách tour
•	Xây dựng trang chi tiết tour
•	Xây dựng chức năng tìm kiếm tour
Nguyễn Huy Hoàng
•	Xây dựng chức năng đặt tour
•	Tích hợp gửi email tự động
•	Xây dựng chức năng thống kê
•	Kiểm thử hệ thống
•	Hoàn thiện tài liệu đồ án
Công nghệ sử dụng
Frontend
•	ReactJS
•	JavaScript (ES6)
•	HTML5
•	CSS3
•	Tailwind CSS
•	Axios
Backend
•	Java Spring Boot
•	RESTful API
•	Spring Security
•	JWT Authentication
Database
•	MySQL
Công cụ hỗ trợ
•	GitHub
•	Visual Studio Code
•	NetBeans / IntelliJ IDEA
•	Postman
•	Docker
•	Excel / Google Sheets
Kiến trúc hệ thống
Frontend (ReactJS)
        |
        v
REST API (Spring Boot)
        |
        v
MySQL Database
Cấu trúc thư mục dự án
tour-booking-system/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── config/
│   └── pom.xml
│
├── database/
│   └── tour_booking.sql
│
├── docker-compose.yml
│
└── README.md
Hướng dẫn cài đặt
1. Clone Source Code
/thiếu/************  





2. Cài đặt Database
Tạo database:
CREATE DATABASE tour_booking;
Import file:
database/tour_booking.sql
3. Cấu hình Backend
Mở file:
backend/src/main/resources/application.properties
Cấu hình:
spring.datasource.url=jdbc:mysql://localhost:3306/tour_booking

spring.datasource.username=root

spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update

server.port=8080
4. Chạy Backend
cd backend
mvn spring-boot:run
Backend chạy tại:
http://localhost:9090
5. Chạy Frontend
cd frontend
npm install
npm start
Frontend chạy tại:
http://localhost:3000
Hướng dẫn chạy bằng Docker
Build và khởi động container
docker-compose up --build
Dừng container
docker-compose down
Tài khoản Demo
\\\\\\\\\\\
Tài khoản Admin
Email: admin@gmail.com
Password: 123456
Tài khoản Khách hàng
Email: user@gmail.com
Password: 123456
Các API chính
Authentication
POST /api/auth/register
POST /api/auth/login
Tour
GET /api/tours
GET /api/tours/{id}
POST /api/tours
PUT /api/tours/{id}
DELETE /api/tours/{id}
Booking
POST /api/bookings
GET /api/bookings
PUT /api/bookings/{id}
Hình ảnh minh họa hệ thống
Trang đăng nhập
 
Trang đăng ký
 
Trang chủ
 
Trang chi tiết tour
 

Trang đặt tour
 

Trang quản lý tour
 

Trang thống kê
 

Video Demo
Link video demo:
https://youtu.be/your-demo-video

Source Code Github

Website Deploy
Link website: http://localhost:3000/home
Kết quả đạt được
•	Hoàn thành hệ thống quản lý và đặt tour du lịch trực tuyến.
•	Xây dựng giao diện thân thiện với người dùng.
•	Hỗ trợ quản lý tour và booking hiệu quả.
•	Tích hợp gửi email xác nhận tự động.
•	Áp dụng kiến trúc RESTful API.
•	Kết nối cơ sở dữ liệu MySQL ổn định.
•	Hỗ trợ triển khai bằng Docker.
Hướng phát triển
•	Tích hợp thanh toán VNPay hoặc MoMo.
•	Xây dựng ứng dụng Mobile.
•	Bổ sung chatbot hỗ trợ khách hàng.
•	Tích hợp AI gợi ý tour phù hợp.
•	Hỗ trợ đa ngôn ngữ.
•	Tích hợp bản đồ và định vị du lịch.

Giảng viên hướng dẫn
Cấn Đức Điệp
