import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar"; // Import component vừa tạo
import { Search, ChevronDown } from "lucide-react";

// Dữ liệu giả (Sau này bạn sẽ thay bằng gọi API từ services)
const mockData = [
  {
    id: 1,
    author: "Đinh Văn Lộc",
    topic: "TRẤN VIÊN CỔ TRẤN - BÁT QUÁI CỔ TRẤN",
    summary:
      "Nếu như bạn đã chán và sợ sự thương nghiệp hóa ở Phượng Hoàng Cổ Trấn...",
    content: "<p>Trấn Viễn cổ trấn nằm tại Quý Châu...</p>",
    date: "24-06-2023",
  },
  {
    id: 2,
    author: "Đinh Văn Lộc",
    topic: "REVIEW HỒ NÚI MỘT - BÌNH ĐỊNH",
    summary: "Hồ Núi Một là một hồ nước ngọt lớn...",
    content: "<p>Nhắc đến những điểm du lịch Bình Định...</p>",
    date: "24-06-2023",
  },
  // ... thêm các data khác
];

const AdminBlog = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-sm">
      {/* 1. Gọi AdminSidebar vào đây */}
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* 2. Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Admin */}
        <header className="h-14 bg-[#3498db] flex items-center justify-between px-6 shadow-md z-10">
          <h1 className="text-xl font-medium uppercase tracking-wide text-white">
            Hệ thống quản lý đặt tour
          </h1>

          <div className="flex items-center text-white cursor-pointer hover:bg-blue-600 px-3 py-1 rounded transition">
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden mr-2">
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right mr-2 hidden sm:block">
              <div className="text-sm font-bold">Tài khoản</div>
              <div className="text-xs italic opacity-90">Quản trị viên</div>
            </div>
            <ChevronDown size={16} />
          </div>
        </header>

        {/* Nội dung bảng (Table) */}
        <main className="flex-1 overflow-auto p-6 bg-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <div className="text-xs text-gray-500 mb-1">
                <span className="text-red-500 font-bold">Trang chủ</span>
                <span className="mx-1 text-gray-400">›</span>
                <span className="font-semibold">Blog</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3498db]">
                Quản lý blog
              </h2>
            </div>

            <div className="mt-4 sm:mt-0 relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="border border-gray-300 rounded pl-3 pr-10 py-1.5 text-sm focus:outline-none focus:border-[#3498db] w-64"
              />
              <Search
                className="absolute right-3 top-1.5 text-gray-400"
                size={16}
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#3498db] text-white text-xs uppercase font-semibold">
                  <th className="p-3 border-r border-blue-400 w-12 text-center">
                    STT
                  </th>
                  <th className="p-3 border-r border-blue-400">Tác giả</th>
                  <th className="p-3 border-r border-blue-400">Chủ đề</th>
                  <th className="p-3 border-r border-blue-400">Tóm tắt</th>
                  <th className="p-3 border-r border-blue-400">Nội dung</th>
                  <th className="p-3 border-r border-blue-400">Ngày đăng</th>
                  <th className="p-3 text-center">Hoạt động</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-xs">
                {mockData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-3 text-center align-top">{item.id}</td>
                    <td className="p-3 align-top font-medium text-gray-600">
                      {item.author}
                    </td>
                    <td className="p-3 align-top font-semibold text-gray-800 uppercase">
                      {item.topic}
                    </td>
                    <td className="p-3 align-top text-gray-500">
                      <div className="line-clamp-3">{item.summary}</div>
                    </td>
                    <td className="p-3 align-top font-mono text-gray-400 text-[10px]">
                      <div className="line-clamp-3">{item.content}</div>
                    </td>
                    <td className="p-3 align-top text-center">{item.date}</td>
                    <td className="p-3 align-top">
                      <div className="flex gap-1 justify-center">
                        <button className="bg-[#3498db] text-white px-2 py-1 rounded text-[10px] font-bold">
                          SỬA
                        </button>
                        <button className="bg-[#3498db] text-white px-2 py-1 rounded text-[10px] font-bold">
                          XÓA
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminBlog;
