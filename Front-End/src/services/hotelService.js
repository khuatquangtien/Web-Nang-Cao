import apiClient from "./apiClient";

export const hotelService = {
  // Lấy danh sách khách sạn có phân trang
  getAll: (params = { page: 0, size: 6, sortby: "id" }) => {
    return apiClient.get("/hotels", { params });
  },

  // Lấy danh sách khách sạn nổi bật
  getFeatured: (params = { page: 0, size: 6 }) => {
    return apiClient.get("/hotels/featuresHotels", { params });
  },

  // Tìm kiếm khách sạn theo từ khóa
  search: (keyword) => {
    return apiClient.get("/hotels/search", { params: { keyword } });
  },

  // Lấy chi tiết 1 khách sạn theo ID
  getById: (id) => {
    return apiClient.get(`/hotels/${id}`);
  },
};
