import axios from 'axios';

// Đảm bảo cổng này đúng với Back-end của bạn (8080 hoặc khác)
const API_URL = "http://localhost:9090/users";

export const login = async (credentials) => {
    // credentials chính là { username: "...", password: "..." }
    // Axios sẽ trả về toàn bộ object Response (bao gồm cả header, status, data...)
    return await axios.post(`${API_URL}/login`, credentials);
};

export const register = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};