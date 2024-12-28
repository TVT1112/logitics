import React from 'react'
import { useContext } from 'react'
import { Storecontext } from '../../../../../food_delivery/src/context/Storecontext'
import './StoreItem.css'
const StoreItem = ({ namestore, img,quantityproduct,status,url,handleclick}) => {
  
    return (
    <div className='storeitem' onClick={handleclick}>
        <div className='store-item-img'>
            <img src={url+"/images/"+img} className='store-img'/>
        </div>
        <div className='store-infor'>
            <div className='store-name-status'>
              <p>
                {namestore}
              </p>
              <p>
                {status}
              </p>
            </div>
            <p className='store-quantity'>Số lượng sản phẩm: {quantityproduct}</p>
        </div>
    </div>
  )
}

export default StoreItem