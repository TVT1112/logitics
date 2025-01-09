import React from 'react'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'
import { BiPlus ,BiListUl,BiSolidShoppingBag,BiBarChartSquare ,BiBell } from "react-icons/bi";

const Sidebar = ({type}) => {
  return (
    <div className='sidebar'>
      {type==="Admin"?(
        <div className='sidebar-options'>
        <NavLink to='/order' className='sidebar-option'>
            <BiSolidShoppingBag className='sidebar-icon'/>
            <p>Các đơn hàng</p>
        </NavLink>
        <NavLink to='/plan' className='sidebar-option'>
            <BiBarChartSquare className='sidebar-icon'/>
            <p>Trang lên kế hoạch</p>
        </NavLink>
        <NavLink to='/notifications' className='sidebar-option'>
            <BiBell className='sidebar-icon'/>
            <p>Trang thông báo</p>
        </NavLink>
        <NavLink to='/chatpage' className='sidebar-option'>
            <BiBarChartSquare className='sidebar-icon'/>
            <p>Trang nhắn tin</p>
        </NavLink>
        </div>
      ):<></>
      }
      {type==="storehouser"?(
        (<div className='sidebar-options'>
        <NavLink to='/add' className='sidebar-option'>
            <BiPlus className='sidebar-icon'/>
            <p>Nhập sản phẩm vào công ty</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option'>
            <BiListUl className='sidebar-icon'/>
            <p>Các sản phẩm vừa nhập về</p>
        </NavLink>
        <NavLink to='/plan' className='sidebar-option'>
            <BiBarChartSquare className='sidebar-icon'/>
            <p>Trang lên kế hoạch</p>
        </NavLink>
        <NavLink to='/store' className='sidebar-option'>
            <BiBarChartSquare className='sidebar-icon'/>
            <p>Trang quản lý kho</p>
        </NavLink>
        </div>) 
      ):<></>}

      {type==="shipping"?(
        (<div className='sidebar-options'>
        <NavLink to='/createship' className='sidebar-option'>
            <BiPlus className='sidebar-icon'/>
            <p>Trang tạo đơn vận chuyển</p>
        </NavLink>
        <NavLink to='/manageship' className='sidebar-option'>
            <BiPlus className='sidebar-icon'/>
            <p>Trang quản lý đơn vận chuyển</p>
        </NavLink>
        </div>) 
      ):<></>}
      
    
    </div>
  )
}

export default Sidebar