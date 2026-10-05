import axios from "axios";
import { BASE_URL } from "../utils/config";

// Cấu hình Axios Client tập trung cho toàn bộ ứng dụng
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tự động đính kèm JWT Token vào Header của mọi request nếu đã đăng nhập
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý lỗi tập trung (nếu token hết hạn hoặc lỗi kết nối)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Phiên đăng nhập đã hết hạn hoặc không có quyền truy cập.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
