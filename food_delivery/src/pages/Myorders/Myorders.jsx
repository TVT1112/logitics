import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import { Storecontext } from '../../context/Storecontext'
import axios from 'axios'
import { BiSolidCart } from "react-icons/bi";

const Myorders = () => {

  const [data,setData]=useState([])
  const {url,token}=useContext(Storecontext)

  const fetchOrders= async ()=>{
    const response= await axios.post(url+"/api/order/userorders",{},{headers:{token}})
    setData(response.data.data)
    console.log(data)
  }

  useEffect(()=>{
    if(token){
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-orders'>
        <h2>Đơn của tôi</h2>
        <div className='container'>
          {data.map((order,index)=>{
              return (
                  <div key={index} className='my-orders-order'>
                    <BiSolidCart className='order-icon'/>
                    <p>{order.items.map((item,index)=>{
                        if(index===order.items.length-1){
                            return item.name+" x "+ item.quantity
                        }
                        else{
                          return item.name+" x "+ item.quantity + ", "
                        }
                    })}</p>
                    <p>{order.amount}.000 vnđ</p>
                    <p>Số đơn hàng: {order.items.length}</p>
                    <p><b>{order.status}</b></p>
                    <button onClick={fetchOrders}>Kiểm tra order</button>
                </div>
              )
          })}
        </div>
    </div>
  )
}

export default Myorders