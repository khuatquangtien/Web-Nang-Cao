import { Link } from 'react-router-dom';
import'../styles/UserBar.css';

const UserBar = () => {
  
  return (
    <div className="user-bar" >
      <div className='user-bar-userOut'> Quản Lí tài khoản</div>
      <div className='user-bar-settingOut'> Cài đặt</div>
      <div>
        <Link to="/login" className='text-decoration-none text-dark'> Đăng xuất </Link>
      </div> 
    </div>
  );
};

export default UserBar;