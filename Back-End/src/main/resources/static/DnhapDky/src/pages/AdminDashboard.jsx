import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  BarChart3,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  MapPin,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// --- DỮ LIỆU GIẢ LẬP (MOCK DATA) ---

// 1. Dữ liệu biểu đồ doanh thu (12 tháng)
const revenueData = [
  { name: "Thg 1", total: 15000000 },
  { name: "Thg 2", total: 23000000 },
  { name: "Thg 3", total: 18000000 },
  { name: "Thg 4", total: 32000000 },
  { name: "Thg 5", total: 45000000 },
  { name: "Thg 6", total: 60000000 }, // Cao điểm hè
  { name: "Thg 7", total: 58000000 },
  { name: "Thg 8", total: 48000000 },
  { name: "Thg 9", total: 30000000 },
  { name: "Thg 10", total: 24000000 },
  { name: "Thg 11", total: 20000000 },
  { name: "Thg 12", total: 28000000 },
];

// 2. Dữ liệu biểu đồ tròn (Trạng thái Tour)
const statusData = [
  { name: "Đang hoạt động", value: 35 },
  { name: "Đã đầy chỗ", value: 10 },
  { name: "Tạm ẩn", value: 5 },
];
const COLORS = ["#3498db", "#e74c3c", "#95a5a6"];

// 3. Danh sách Tour bán chạy nhất
const topTours = [
  {
    id: 1,
    name: "Kỳ Co - Eo Gió - Quy Nhơn",
    bookings: 124,
    revenue: "93,000,000đ",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&q=80",
  },
  {
    id: 2,
    name: "Phú Yên - Hoa Vàng Cỏ Xanh",
    bookings: 98,
    revenue: "83,300,000đ",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=100&q=80",
  },
  {
    id: 3,
    name: "Đà Nẵng - Hội An - Bà Nà",
    bookings: 85,
    revenue: "120,500,000đ",
    image:
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=100&q=80",
  },
  {
    id: 4,
    name: "Tour Cù Lao Xanh 2N1Đ",
    bookings: 54,
    revenue: "43,200,000đ",
    image:
      "https://images.unsplash.com/photo-1583315648833-28c0c9973278?w=100&q=80",
  },
];

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-sm">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activePage="dashboard"
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-[#3498db] flex items-center justify-between px-6 shadow-md z-10 text-white flex-shrink-0">
          <h1 className="text-lg font-bold uppercase tracking-wide">
            Tổng quan thống kê
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-80">
              Cập nhật: Hôm nay, 16/01/2024
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {/* 1. KHỐI THỐNG KÊ (KPI CARDS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Tổng doanh thu"
              value="452.5M"
              subValue="+12.5% so với tháng trước"
              icon={<DollarSign size={24} className="text-white" />}
              color="bg-blue-500"
              trend="up"
            />
            <StatCard
              title="Tổng lượt đặt"
              value="1,245"
              subValue="+5.2% so với tháng trước"
              icon={<Calendar size={24} className="text-white" />}
              color="bg-green-500"
              trend="up"
            />
            <StatCard
              title="Khách hàng mới"
              value="342"
              subValue="-2.1% so với tháng trước"
              icon={<Users size={24} className="text-white" />}
              color="bg-purple-500"
              trend="down"
            />
            <StatCard
              title="Tour đang chạy"
              value="48"
              subValue="Trên tổng số 50 tour"
              icon={<MapPin size={24} className="text-white" />}
              color="bg-orange-500"
              trend="neutral"
            />
          </div>

          {/* 2. BIỂU ĐỒ (CHARTS) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Biểu đồ doanh thu (Chiếm 2 phần) */}
            <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-700 text-lg flex items-center gap-2">
                  <TrendingUp size={20} className="text-[#3498db]" />
                  Biểu đồ doanh thu năm 2024
                </h3>
                <select className="border rounded px-2 py-1 text-xs outline-none focus:border-blue-500">
                  <option>Năm nay</option>
                  <option>Năm ngoái</option>
                </select>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3498db"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3498db"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value / 1000000}M`}
                    />
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#eee"
                    />
                    <Tooltip
                      formatter={(value) =>
                        new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(value)
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#3498db"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Biểu đồ tròn (Chiếm 1 phần) */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 text-lg mb-4">
                Tình trạng Tour
              </h3>
              <div className="h-64 w-full flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-xs text-gray-500 mt-2">
                Tổng số 50 tour trong hệ thống
              </div>
            </div>
          </div>

          {/* 3. BẢNG TOP TOUR (TABLE) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-700 text-lg">
                Tour bán chạy nhất
              </h3>
              <button className="text-[#3498db] text-xs font-bold hover:underline">
                Xem tất cả
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                  <tr>
                    <th className="p-4">Tên Tour</th>
                    <th className="p-4 text-center">Lượt đặt</th>
                    <th className="p-4 text-right">Tổng thu</th>
                    <th className="p-4 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topTours.map((tour) => (
                    <tr key={tour.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={tour.image}
                          alt=""
                          className="w-10 h-10 rounded object-cover shadow-sm"
                        />
                        <span className="font-medium text-gray-800 text-sm">
                          {tour.name}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold text-gray-600">
                        {tour.bookings}
                      </td>
                      <td className="p-4 text-right font-bold text-[#3498db]">
                        {tour.revenue}
                      </td>
                      <td className="p-4 text-center">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Component con: Thẻ Stat (dùng để hiển thị 4 ô vuông trên cùng)
const StatCard = ({ title, value, subValue, icon, color, trend }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition">
      <div>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
          {title}
        </p>
        <h4 className="text-2xl font-bold text-gray-800 mb-1">{value}</h4>

        <div
          className={`flex items-center gap-1 text-xs ${
            trend === "up"
              ? "text-green-500"
              : trend === "down"
              ? "text-red-500"
              : "text-gray-400"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpRight size={14} />
          ) : trend === "down" ? (
            <ArrowDownRight size={14} />
          ) : null}
          <span>{subValue}</span>
        </div>
      </div>
      <div className={`p-3 rounded-lg shadow-sm ${color}`}>{icon}</div>
    </div>
  );
};

export default AdminDashboard;
