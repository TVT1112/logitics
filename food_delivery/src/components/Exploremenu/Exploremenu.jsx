import React from 'react'
import './Exploremenu.css'
import {menu} from '../../assets/index'

const Exploremenu = ({category,setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Xem ngay các sản phẩm của quán</h1>
        <p className='explore-menu-text'>Hãy chọn lọc các sản phẩm bạn yêu thích</p>
        <div className='explore-menu-list'>
            {menu.map((item,index)=>{
              return (
                <div onClick={()=>setCategory(prev=>prev===item.name?"All":item.name)} key={index} className='explore-menu-list-item'>
                    <img className={category===item.name?"active":""} src={item.img}/>
                    <p>{item.name}</p>
                </div>
              )
            })}
        </div>
        <hr/>

    </div>
  )
}

export default Exploremenu