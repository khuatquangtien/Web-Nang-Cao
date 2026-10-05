import apiClient from "./apiClient";

export const tourService = {
  // Lấy danh sách tour có phân trang
  getAll: (params = { page: 0, size: 6, sortby: "id" }) => {
    return apiClient.get("/tours", { params });
  },

  // Lấy danh sách tour nổi bật (có phân trang)
  getFeatured: (params = { page: 0, size: 6 }) => {
    return apiClient.get("/tours/search/getFeaturedTours", { params });
  },

  // Tìm kiếm tour theo từ khóa
  search: (keyword) => {
    return apiClient.get("/tours/search", { params: { keyword } });
  },

  // Lấy chi tiết 1 tour theo ID
  getById: (id) => {
    return apiClient.get(`/tours/${id}`);
  },
};

