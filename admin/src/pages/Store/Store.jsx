import React, { useContext, useState } from 'react'
import axios from 'axios'
import { CreateStore, ListStore } from '../../components'
import { Storecontext } from '../../context/Storecontext'
import './Store.css'
const Store = () => {
  const [switchbtn,setSwitch] = useState(true)
  const {url}= useContext(Storecontext)

  return (
    <div className='storepage'>
        <button onClick={()=>setSwitch(!switchbtn)}>Danh sách kho</button>
        <button onClick={()=>setSwitch(!switchbtn)}>Thêm nhà kho</button>
        {switchbtn?<CreateStore url={url}/>:<ListStore url={url}/>}
        
    </div>
  )
}

export default Store