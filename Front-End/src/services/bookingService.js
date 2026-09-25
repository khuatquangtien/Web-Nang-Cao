// src/services/bookingService.js
import axios from "axios";
import { BASE_URL } from "../utils/config";


const API_URL = `${BASE_URL}/bookings/tour`; //  Dùng chung BASE_URL (cổng 9090)

export const createBooking = (data, token) => {
  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getMyBookings = (token) => {
  return axios.get(`${API_URL}/my-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
