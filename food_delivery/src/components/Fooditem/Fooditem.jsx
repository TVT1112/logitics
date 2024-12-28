import React, { useContext} from 'react'
import './FoodItem.css'
import { Storecontext } from '../../context/Storecontext';
import { BiSolidStar,BiSolidPlusCircle ,BiMinus,BiPlus} from "react-icons/bi";
const Fooditem = ({id,name,price,description,image}) => {
  
  const {cartItems,addTocart,removeFromcart,url}=useContext(Storecontext)
  
  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img src={url+"/images/"+image} className='food-item-img'/>
            {!cartItems[id]
              ?<BiPlus className='add' onClick={()=>addTocart(id)}/>
              :<div className='food-item-counter'>
                <BiMinus onClick={()=>removeFromcart(id)}/>
                <p>{cartItems[id]}</p>
                <BiSolidPlusCircle onClick={()=>addTocart(id)}/>
              </div>
            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
            <p>
              {name}
            </p>
            <BiSolidStar className='food-icon'/>
            </div>
            <p className='food-item-description'>{description}</p>
            <p className='food-item-price'> {price}.000 vnđ</p>
        </div>
    </div>
  )
}

export default Fooditem