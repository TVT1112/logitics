import React, { useContext } from 'react'
import './Navbar.css'
import { BiLogOut,BiBell } from "react-icons/bi";
import { Storecontext } from '../../context/Storecontext.jsx'
import { asset } from '../../assets/index.js'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Navbar = ({setShowlogin}) => {

  const {token,setToken}=useContext(Storecontext)

  const navigate = useNavigate()

  const logout=()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
}

  return (
    <div className='navbar'>
      <h1 className='logo'>TVT-admin</h1>
      
      <div className="navbar-right">
            {!token?<button onClick={()=>setShowlogin(true)}>Đăng kí</button>:
                <div>
                <Link to='/cart'><BiBell className='icon basket'/></Link>
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