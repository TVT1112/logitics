import React, { useContext, useState } from 'react'
import { BiSearch ,BiBasket,BiLogOut,BiShoppingBag  } from "react-icons/bi";
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Storecontext } from '../../context/Storecontext';
import { profile } from '../../assets';

const Navbar = ({setShowlogin}) => {


    const [menu,setMenu]=useState("home")

    const {getTotalCartAmount,token,setToken}= useContext(Storecontext)

    const navigate = useNavigate()
    
    const logout=()=>{
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
    }
  return (
    <div className="navbar">
        <Link to='/'><h1 className="logo">TVT</h1></Link>
        <ul className="navbar-menu">
            <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Trang chủ</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Sản phẩm</a>
            <li onClick={()=>setMenu("contact")} className={menu==="contact"?"active":""}>Liên lạc với chúng tôi</li>
        </ul>
        <div className="navbar-right">
            <BiSearch className='icon search'/>
            <div className="navbar-search-icon">
                <Link to='/cart'><BiBasket className='icon basket'/></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}>
                    
                </div>
            </div>
            {!token?<button onClick={()=>setShowlogin(true)}>Đăng kí</button>:
                <div className='navbar-profile'>
                    <img src={profile} className='nav-profile'/>
                    <ul className='nav-profile-dropdown'>
                        <li onClick={()=>navigate('/myorder')}><BiShoppingBag className='nav-icon'/><p>các đơn hàng</p></li>
                        <hr/>
                        <li onClick={logout}><BiLogOut className='nav-icon'/><p>đăng xuất</p></li>
                    </ul>
                </div>
            }
          
        </div>
        
    </div>
  )
}

export default Navbar