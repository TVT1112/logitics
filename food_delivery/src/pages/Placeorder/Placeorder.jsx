import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { Storecontext } from '../../context/Storecontext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Placeorder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url}= useContext(Storecontext)
  const navigate = useNavigate()

  const [data,setData]= useState({
    ho:"",
    ten:"",
    email:"",
    duong:"",
    phuong:"",
    city:"",
    phone:""
  })


  const onChangeHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
  }

  const submitplace=async (event)=>{
    event.preventDefault();
    let orderItem = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
          let itemInfo=item
          itemInfo["quantity"]= cartItems[item._id]
          orderItem.push(itemInfo)
      }
    })

  

    let orderData={
      address:data,
      items:orderItem,
      amount:getTotalCartAmount()+10,
      payment:true
    }

    
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    console.log(response.data.success,response.data.message)
    if(response.data.success){
      toast.success(response.data.message)
      navigate("/myorder")
    }
    else{
      toast.error(response.data.message)
      navigate("/")
    }
    
  }

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  
  return (
    <div>
      <form className='place-order' onSubmit={submitplace}>
        <div className='place-order-left'>
          <p className='title'>Thông tin giao hàng</p>
          <div className='multi-fields'>
              <input required type='text' name='ho' onChange={onChangeHandler} value={data.ho} placeholder='Họ'/>
              <input required type='text' name='ten' onChange={onChangeHandler} value={data.ten} placeholder='Tên'/>
          </div>
          <input required type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email'/>
          <input required type='text' name='duong' onChange={onChangeHandler} value={data.duong} placeholder='Đường'/>
          <div className='multi-fields'>
              <input required type='text' name='phuong' onChange={onChangeHandler} value={data.phuong} placeholder='Phường hoặc phố'/>
              <input required type='text' name='city' onChange={onChangeHandler} value={data.city} placeholder='Thành phố'/>
          </div>
          <input required type='text' name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Số điện thoại'/>
        </div>
        <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Tổng các đơn hàng</h2>
          <div>
            <div className='cart-total-details'>
                  <p>Tổng tiền</p>
                  <p>{getTotalCartAmount()}.000 vnđ</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                  <p>Tiền ship</p>
                  <p>{getTotalCartAmount()===0?0:10}.000 vnđ</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                  <b>Tổng tất cả</b>
                  <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+10}.000 vnđ</b>
              </div>
              <button type='submit'>Thanh toán</button>
          </div>
          

        </div>
        </div>
        
      </form>
    </div>
  )
}

export default Placeorder