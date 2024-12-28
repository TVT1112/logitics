import React from 'react'
import './Order.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import { BiSolidCart } from "react-icons/bi";

const Order = ({url}) => {
  const [orders, setOrders]= useState([])


  const fetchAllOrders= async ()=>{
    const response = await axios.get(url+"/api/order/list");
    if(response.data.success){
      setOrders(response.data.data)
    }
    else{
      toast.error("Lỗi")
    }

  }

  const statusHandler= async (event,orderId)=>{
      console.log(event,orderId)
      const response= await axios.post(url+"/api/order/status",{
        orderId,
        status:event.target.value
      })
      if(response.data.success){
        await fetchAllOrders()

      }
  }

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(url + `/api/order/delete`,{params:{orderId}});
      if (response.data.success) {
        toast.success("Đã xóa đơn hàng thành công");
        await fetchAllOrders();  // Cập nhật lại danh sách đơn hàng
      } else {
        toast.error("Lỗi khi xóa đơn hàng");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi xóa đơn hàng");
    }
  };

  useEffect(()=>{
    fetchAllOrders()
  },[])

  return (
    <div className='order add'>
      <h3>Trang đơn hàng</h3>
      {
        orders.map((order,index)=>{
           return (
            <div key={index} className='order-item'>
                <BiSolidCart className='order-icon'/>
                <div>
                  <p className='order-item-food'>
                    {order.items.map((item,index)=>{
                        if(index===order.items.length-1){
                          return item.name + " x " + item.quantity
                        }
                        else {
                          return item.name + " x " + item.quantity + ", "
                        }
                    })}
                  </p>
                  <p className='order-item-name'>{order.address.ho + " "+ order.address.ten}</p>
                  <div className='order-item-address'>
                    <p>{order.address.duong+", "+order.address.phuong + ", "+order.address.city}</p>
                    
                  </div>
                  <p className='order-item-phone'>
                    <p>{order.address.phone}</p>
                  </p>
                  
                </div>
                <p>Số lượng sản phẩm: {order.items.length}</p>
                  <p>{order.amount}.000 vnđ</p>
                  <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                      <option value="Đang chuẩn bị">Đang chuẩn bị</option>
                      <option value="Đã hết sản phẩm">Đã hết sản phẩm</option>
                      <option value="Đã giao thành công">Đã giao thành công</option>
                  </select>
                  <button className='delete-button' onClick={() => deleteOrder(order._id)}>Xóa</button>
            </div>  
           )
        })
      }
    </div>
  )
}

export default Order