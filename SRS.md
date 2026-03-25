# Software Requirements Specification (SRS) - TravelBooking System

Dưới đây là đặc tả yêu cầu cho các chức năng cốt lõi dựa trên cấu trúc source code hiện tại.

## 1. Quản lý Tour (`TourController.java`)
* **Mô tả:** Cho phép khách hàng xem danh sách tour và Admin quản lý thông tin tour.
* **Tác nhân:** Khách hàng, Admin.
* **Luồng chính:** 1. Người dùng gửi yêu cầu xem danh sách tour qua API.
    2. Hệ thống truy vấn Database thông qua `TourRepository`.
    3. Trả về dữ liệu Tour dạng JSON (thông qua DTO).
* **Tiền điều kiện:** Dữ liệu tour đã được khởi tạo trong Database.

## 2. Đặt Tour (`BookingController.java`)
* **Mô tả:** Xử lý quy trình đặt tour của khách hàng.
* **Tác nhân:** Khách hàng (Đã đăng nhập).
* **Luồng chính:** 1. Khách hàng chọn Tour và gửi thông tin đặt chỗ (ngày đi, số lượng khách).
    2. `BookingService` kiểm tra tính hợp lệ và tính tổng tiền.
    3. Hệ thống lưu bản ghi vào bảng `Booking` và gửi phản hồi thành công.
* **Hậu điều kiện:** Trạng thái tour của khách hàng được lưu ở chế độ "Chờ thanh toán" hoặc "Đã đặt".

## 3. Quản lý Người dùng (`UserController.java`)
* **Mô tả:** Quản lý thông tin cá nhân và tài khoản người dùng.
* **Tác nhân:** Người dùng, Admin.
* **Luồng chính:**
    1. Người dùng thực hiện đăng ký/đăng nhập.
    2. Hệ thống xác thực thông tin thông qua lớp Service và Repository.
    3. Trả về Token hoặc Session để duy trì đăng nhập.
