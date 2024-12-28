import React, { useContext } from 'react'
import { Storecontext } from '../../context/Storecontext'
import {useNavigate} from 'react-router-dom'
import './Cart.css'
const Cart = () => {

  const {cartItems,food_list,removeFromcart,getTotalCartAmount,url}=useContext(Storecontext)
  const navigate=useNavigate();
  return (
    <div className='cart'>
      <div className='cart-items-title'>
          <p>Sản phẩm</p>
          <p>Tiêu đề</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng</p>
          <p>Loại bỏ</p>
      </div>
      <br/>
      <hr/>
      {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image}/>
                  <p>{item.name}</p>
                  <p>{item.price}.000 vnđ</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price*cartItems[item._id]}.000 vnđ</p>
                  <p onClick={()=>removeFromcart(item._id)} className='cross'>x</p>
                </div>
                <hr/>
              </div>
              
            )
          }
      })}
      <div className='cart-bottom'>
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
         
          </div>
          <button onClick={()=>navigate('/placeorder')}>Xác nhận đơn</button>

        </div>
        <div className='cart-promocode'>
          <div>
            <p>Nếu bạn có mã giảm giá, nhập vào đây</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='mã giảm giá'/>
              <button>Xác nhận</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart