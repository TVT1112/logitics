import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { BiLogOut,BiBell } from "react-icons/bi";
import { Storecontext } from '../../context/Storecontext.jsx'
import { asset } from '../../assets/index.js'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Navbar = ({setShowlogin}) => {

  const {token,setToken}=useContext(Storecontext)
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate()

  const logout=()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
}

const updateUnreadCount = () => {
  const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
  const unreadNotifications = storedNotifications.filter(notif => !notif.read).length;
  setUnreadCount(unreadNotifications);
};

useEffect(() => {
  updateUnreadCount();

  // Theo dõi thay đổi localStorage
  const interval = setInterval(() => {
    updateUnreadCount();
  }, 1000); // Cập nhật mỗi giây (tùy chỉnh thời gian nếu cần)

  return () => clearInterval(interval); // Xóa interval khi component bị hủy
}, []);

  return (
    <div className='navbar'>
      <h1 className='logo'>TVT-admin</h1>
      
      <div className="navbar-right">
            {!token?<button onClick={()=>setShowlogin(true)}>Đăng kí</button>:
                <div className='contain_right'>
                <div className="bell-container">
                  <Link to='/notifications'>
                    <BiBell className='icon_bell' />
                    {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                  </Link>
                </div>
                <div className='navbar-profile'>
                    <img src={asset.profile} className='nav-profile'/>
                    <ul className='nav-profile-dropdown'>
                        <li onClick={logout}><BiLogOut className='nav-icon'/><p>đăng xuất</p></li>
                    </ul>
                </div>
                </div>
            }
          
        </div>
    </div>
  )
}

export default Navbar