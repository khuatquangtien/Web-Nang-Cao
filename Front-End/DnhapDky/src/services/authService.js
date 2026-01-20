// src/services/authService.js
import axios from "axios";

// SỬA LẠI: Đổi port thành 9090 và đường dẫn thành /users
const API_URL = "http://localhost:9090/users"; 

export const login = (data) => {
  // Sẽ gọi: http://localhost:9090/users/login
  return axios.post(`${API_URL}/login`, data);
};

export const register = (data) => {
  // Sẽ gọi: http://localhost:9090/users/register
  return axios.post(`${API_URL}/register`, data);
};