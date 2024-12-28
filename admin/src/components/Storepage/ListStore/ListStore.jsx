import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import StoreItem from '../StoreItem/StoreItem'
import './ListStore.css'
const ListStore = ({url}) => {

  const [list,setList]= useState([])
  const navigate=useNavigate()

  const handlenavigate = (store)=>{
    navigate(`/storedetail/${store.namestore}`,{state:store})
  }

  const fetchStorelist = async ()=>{
    try {
      const response = await axios.get(url+"/api/store/liststore")
      setList(response.data.data)
    } catch (error) {
      console.error('Error fetching targets:', error);
    }
  }

  useEffect(()=>{
    fetchStorelist()
  },[])

  return (
    <div className='store-display'>
        <h2>
          Danh sách các nhà kho
        </h2>
        <div className='store-display-list'>
            {list.map((item,index)=>{
              return <StoreItem key={index} handleclick={()=>handlenavigate(item)} namestore={item.namestore} img={item.img} 
              quantityproduct={item.quantityproduct} status={item.status} url={url}/>
            })}
        </div>
    </div>
  )
}

export default ListStore