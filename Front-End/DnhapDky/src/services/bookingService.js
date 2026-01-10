// src/services/bookingService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/bookings";

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
