import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  Search,
  ChevronDown,
  Plus,
  MapPin,
  Clock,
  DollarSign,
  Edit,
  Trash2,
} from "lucide-react";

// Dữ liệu mẫu cho Tour
const mockTours = [
  {
    id: 1,
    name: "Tour Kỳ Co - Eo Gió - Tịnh Xá Ngọc Hòa",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    price: "750,000đ",
    duration: "1 Ngày",
    location: "Quy Nhơn",
    status: "active", // active hoặc hidden
    slots: 15,
  },
  {
    id: 2,
    name: "Khám phá Phú Yên - Hoa Vàng Trên Cỏ Xanh",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    price: "850,000đ",
    duration: "1 Ngày",
    location: "Phú Yên",
    status: "active",
    slots: 20,
  },
  {
    id: 3,
    name: "Tour Cù Lao Xanh - Đảo Ngọc Quy Nhơn",
    image:
      "https://images.unsplash.com/photo-1583315648833-28c0c9973278?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    price: "800,000đ",
    duration: "2 Ngày 1 Đêm",
    location: "Cù Lao Xanh",
    status: "hidden",
    slots: 10,
  },
];

const AdminTour = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-sm">
      {/* Sidebar */}
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-[#3498db] flex items-center justify-between px-6 shadow-md z-10">
          <h1 className="text-xl font-medium uppercase tracking-wide text-white">
            Hệ thống quản lý đặt tour
          </h1>

          <div className="flex items-center text-white cursor-pointer hover:bg-blue-600 px-3 py-1 rounded transition">
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden mr-2">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right mr-2 hidden sm:block">
              <div className="text-sm font-bold">Admin</div>
              <div className="text-xs italic opacity-90">Quản trị viên</div>
            </div>
            <ChevronDown size={16} />
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-auto p-6 bg-white">
          {/* Breadcrumb & Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">
                <span className="text-red-500 font-bold">Trang chủ</span>
                <span className="mx-1 text-gray-400">›</span>
                <span className="font-semibold">Tour</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3498db]">
                Danh sách Tour du lịch
              </h2>
            </div>

            <div className="flex gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm tên tour..."
                  className="border border-gray-300 rounded pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-[#3498db] w-64 shadow-sm"
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={16}
                />
              </div>

              {/* Add New Button */}
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-sm flex items-center gap-1 font-medium transition">
                <Plus size={18} /> Thêm mới
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#3498db] text-white text-xs uppercase font-semibold">
                  <th className="p-3 border-r border-blue-400 w-12 text-center">
                    ID
                  </th>
                  <th className="p-3 border-r border-blue-400 w-24 text-center">
                    Hình ảnh
                  </th>
                  <th className="p-3 border-r border-blue-400">Tên Tour</th>
                  <th className="p-3 border-r border-blue-400 w-32">
                    Giá / Thời gian
                  </th>
                  <th className="p-3 border-r border-blue-400 w-32">
                    Địa điểm
                  </th>
                  <th className="p-3 border-r border-blue-400 w-24 text-center">
                    Trạng thái
                  </th>
                  <th className="p-3 text-center w-28">Hành động</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-xs">
                {mockTours.map((tour) => (
                  <tr
                    key={tour.id}
                    className="border-b border-gray-100 hover:bg-gray-50 align-middle"
                  >
                    <td className="p-3 text-center font-bold text-gray-500">
                      {tour.id}
                    </td>

                    {/* Hình ảnh */}
                    <td className="p-3 text-center">
                      <div className="w-16 h-12 rounded overflow-hidden shadow-sm mx-auto border border-gray-200">
                        <img
                          src={tour.image}
                          alt="Tour"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Tên Tour */}
                    <td className="p-3 font-semibold text-gray-700 text-sm">
                      {tour.name}
                      <div className="text-[10px] text-gray-400 font-normal mt-1 flex items-center gap-1">
                        Còn {tour.slots} chỗ trống
                      </div>
                    </td>

                    {/* Giá & Thời gian */}
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-red-500 font-bold">
                        <DollarSign size={10} /> {tour.price}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 mt-1">
                        <Clock size={10} /> {tour.duration}
                      </div>
                    </td>

                    {/* Địa điểm */}
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-blue-600 font-medium">
                        <MapPin size={10} /> {tour.location}
                      </div>
                    </td>

                    {/* Trạng thái */}
                    <td className="p-3 text-center">
                      {tour.status === "active" ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold border border-green-200">
                          Hiện
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-[10px] font-bold border border-gray-200">
                          Ẩn
                        </span>
                      )}
                    </td>

                    {/* Nút bấm */}
                    <td className="p-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="text-blue-500 hover:text-blue-700 bg-blue-50 p-1.5 rounded transition"
                          title="Chỉnh sửa"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded transition"
                          title="Xóa"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (Phân trang) */}
          <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
            <div>Hiển thị 3 trên 50 tour</div>
            <div className="flex gap-1">
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                Trước
              </button>
              <button className="px-3 py-1 border bg-[#3498db] text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                Sau
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminTour;
