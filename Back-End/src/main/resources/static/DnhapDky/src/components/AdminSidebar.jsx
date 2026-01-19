import {
  LayoutDashboard,
  Map,
  Building2,
  FileText,
  MapPin,
  Receipt,
  Users,
  HelpCircle,
  MessageSquare,
  File,
  User,
  Menu,
} from "lucide-react";

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside
      className={`bg-[#2c3e50] text-gray-300 flex-shrink-0 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <div
        className="h-14 bg-[#3498db] flex items-center justify-center font-bold text-white text-xl cursor-pointer"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <span className="uppercase">Menu</span> : <Menu />}
      </div>

      <nav className="mt-2 overflow-y-auto h-[calc(100vh-3.5rem)]">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Quản lý"
          isOpen={isSidebarOpen}
        />
        <SidebarItem
          icon={<Map size={18} />}
          label="Tour"
          isOpen={isSidebarOpen}
        />
        <SidebarItem
          icon={<Building2 size={18} />}
          label="Khách sạn"
          isOpen={isSidebarOpen}
        />

        {/* Active Item - Blog */}
        <div className="bg-[#243342] border-l-4 border-[#3498db] text-white">
          <div className="flex items-center px-4 py-3 cursor-pointer hover:text-white">
            <FileText size={18} />
            {isSidebarOpen && <span className="ml-3 font-medium">Blog</span>}
          </div>
        </div>

        <SidebarItem
          icon={<MapPin size={18} />}
          label="Tỉnh"
          isOpen={isSidebarOpen}
        />
        <SidebarItem
          icon={<Receipt size={18} />}
          label="Hóa đơn"
          isOpen={isSidebarOpen}
        />
        <SidebarItem
          icon={<Users size={18} />}
          label="Người dùng"
          isOpen={isSidebarOpen}
        />
        {/* Thêm các mục khác nếu cần */}
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label, isOpen }) => (
  <div className="flex items-center px-4 py-3 cursor-pointer text-gray-400 hover:bg-slate-700 hover:text-white transition-colors border-b border-slate-700/50">
    <div className="w-5">{icon}</div>
    {isOpen && <span className="ml-3 font-medium text-sm">{label}</span>}
  </div>
);

export default AdminSidebar;
