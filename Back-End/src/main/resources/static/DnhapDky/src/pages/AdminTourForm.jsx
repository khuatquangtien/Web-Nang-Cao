import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { ChevronDown, Save, ArrowLeft, Image, UploadCloud } from 'lucide-react';

const AdminTourForm = () => {
  const { id } = useParams(); // Lấy ID từ URL (nếu có)
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Xác định chế độ: Nếu có id là Sửa, không có là Thêm
  const isEditMode = Boolean(id);

  // State lưu dữ liệu Form
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    location: '',
    slots: '',
    start_date: '',
    status: 'active',
    image: '',
    description: '',
    featured: false
  });

  // Giả lập lấy dữ liệu khi Sửa (Sau này thay bằng API)
  useEffect(() => {
    if (isEditMode) {
      // Ví dụ: Gọi API lấy tour theo id
      // const data = await fetchTourById(id);
      
      // Mock data tạm thời
      const mockData = {
        name: "Tour Kỳ Co - Eo Gió - Tịnh Xá Ngọc Hòa",
        price: 750000,
        duration: "1 Ngày",
        location: "Quy Nhơn",
        slots: 15,
        start_date: "2024-05-30",
        status: "active",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        description: "Khám phá vẻ đẹp hoang sơ của Kỳ Co...",
        featured: true
      };
      setFormData(mockData);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic gọi API Save/Update ở đây
    console.log("Dữ liệu submit:", formData);
    
    alert(isEditMode ? "Đã cập nhật tour thành công!" : "Đã thêm tour mới thành công!");
    navigate('/admin/tour'); // Quay lại trang danh sách
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-sm">
      <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} activePage="tour" />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-[#3498db] flex items-center justify-between px-6 shadow-md z-10 text-white">
            <div className="flex items-center gap-4">
                 <button onClick={() => navigate('/admin/tour')} className="hover:bg-blue-600 p-1 rounded transition">
                    <ArrowLeft size={20} />
                 </button>
                 <h1 className="text-lg font-bold uppercase tracking-wide">
                    {isEditMode ? `Cập nhật Tour #${id}` : "Thêm Tour mới"}
                 </h1>
            </div>
            
            <div className="flex items-center cursor-pointer">
              <div className="text-sm font-bold mr-2">Admin</div>
              <ChevronDown size={16} />
            </div>
        </header>

        {/* Main Form */}
        <main className="flex-1 overflow-auto p-6">
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
            
            <div className="flex justify-between items-center mb-6">
                <div className="text-gray-500 text-xs">
                    Trang chủ / Tour / <span className="text-[#3498db] font-semibold">{isEditMode ? "Sửa" : "Thêm mới"}</span>
                </div>
                <button type="submit" className="bg-[#3498db] hover:bg-blue-600 text-white px-6 py-2 rounded shadow flex items-center gap-2 font-bold transition transform active:scale-95">
                    <Save size={18} />
                    {isEditMode ? "LƯU THAY ĐỔI" : "TẠO TOUR MỚI"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Cột bên trái: Thông tin chính (Chiếm 2 phần) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Block 1: Thông tin cơ bản */}
                    <div className="bg-white p-5 rounded shadow-sm border border-gray-200">
                        <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b">Thông tin cơ bản</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-gray-700 font-medium mb-1">Tên Tour <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" name="name" required 
                                    value={formData.name} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-[#3498db] outline-none transition" 
                                    placeholder="Ví dụ: Tour Quy Nhơn 3N2Đ..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Giá Tour (VNĐ) <span className="text-red-500">*</span></label>
                                <input 
                                    type="number" name="price" required 
                                    value={formData.price} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded focus:border-[#3498db] outline-none" 
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Thời lượng <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" name="duration" required 
                                    value={formData.duration} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded focus:border-[#3498db] outline-none" 
                                    placeholder="VD: 2 Ngày 1 Đêm"
                                />
                            </div>

                             <div>
                                <label className="block text-gray-700 font-medium mb-1">Địa điểm khởi hành</label>
                                <input 
                                    type="text" name="location" 
                                    value={formData.location} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded focus:border-[#3498db] outline-none" 
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Số chỗ tối đa</label>
                                <input 
                                    type="number" name="slots" 
                                    value={formData.slots} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded focus:border-[#3498db] outline-none" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Block 2: Mô tả chi tiết */}
                    <div className="bg-white p-5 rounded shadow-sm border border-gray-200">
                        <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b">Nội dung bài viết</h3>
                        <label className="block text-gray-700 font-medium mb-1">Mô tả chi tiết / Lịch trình</label>
                        <textarea 
                            name="description" rows="10" 
                            value={formData.description} onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded focus:border-[#3498db] outline-none text-sm leading-relaxed"
                            placeholder="Nhập nội dung chi tiết về tour, lịch trình cụ thể..."
                        ></textarea>
                    </div>
                </div>

                {/* Cột bên phải: Cài đặt & Hình ảnh (Chiếm 1 phần) */}
                <div className="space-y-6">
                    
                    {/* Trạng thái */}
                    <div className="bg-white p-5 rounded shadow-sm border border-gray-200">
                        <h3 className="text-base font-bold text-gray-800 mb-4">Cài đặt</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Trạng thái</label>
                                <select 
                                    name="status" 
                                    value={formData.status} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded focus:border-[#3498db] outline-none"
                                >
                                    <option value="active">Công khai (Hiện)</option>
                                    <option value="hidden">Nháp (Ẩn)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Ngày khởi hành</label>
                                <input 
                                    type="date" name="start_date" 
                                    value={formData.start_date} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded focus:border-[#3498db] outline-none"
                                />
                            </div>

                            <div className="flex items-center">
                                <input 
                                    type="checkbox" id="featured" name="featured"
                                    checked={formData.featured} onChange={handleChange}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <label htmlFor="featured" className="ml-2 text-gray-700 font-medium select-none cursor-pointer">
                                    Tour nổi bật (Hot)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Hình ảnh */}
                    <div className="bg-white p-5 rounded shadow-sm border border-gray-200">
                        <h3 className="text-base font-bold text-gray-800 mb-4">Hình ảnh đại diện</h3>
                        
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer relative group">
                            {formData.image ? (
                                <div className="relative">
                                    <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded" />
                                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white text-xs rounded">
                                        Nhấn để thay đổi
                                    </div>
                                </div>
                            ) : (
                                <div className="py-8">
                                    <UploadCloud className="mx-auto text-gray-400 mb-2" size={40} />
                                    <span className="text-gray-500 text-xs">Tải ảnh lên hoặc dán URL</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-3">
                            <label className="text-xs text-gray-500 font-bold">Hoặc dán link ảnh:</label>
                            <div className="flex gap-2 mt-1">
                                <div className="relative flex-1">
                                     <Image size={16} className="absolute left-2 top-2.5 text-gray-400" />
                                     <input 
                                        type="text" name="image" 
                                        value={formData.image} onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full border border-gray-300 pl-8 p-2 rounded text-xs focus:border-[#3498db] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

          </form>
        </main>
      </div>
    </div>
  );
};

export default AdminTourForm;