import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CreateStore, ListStore } from '../../components'
import { Storecontext } from '../../context/Storecontext'
import './Store.css'
import { data } from 'react-router-dom'
import { toast } from 'react-toastify'
const Store = () => {
  const [switchbtn,setSwitch] = useState(false)
  const [list,setList]= useState([])
  const {url}= useContext(Storecontext)

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

  const handleHash = async () => {
    try {
      // Mã hóa dữ liệu
      for (let i = 0; i < list.length; i++) {
        console.log("Đang mã hóa:", list[i]);
  
        const response = await axios.put(url + "/api/store/hash", {
          data: list[i], // Chuyển toàn bộ object
          name: list[i].namestore,
        });
  
        if (!response.data.success) {
          console.error("Lỗi mã hóa:", response.data.message);
          throw new Error(response.data.message);
        }
  
        // Cập nhật hash vào list
        list[i].hash = response.data.hash;
      }
  
      // Liên kết prevhash
      for (let i = 1; i < list.length; i++) {
        console.log("Đang liên kết prevhash:", list[i]);
  
        const response = await axios.put(url + "/api/store/prevhash", {
          prevhash: list[i - 1].hash,
          name: list[i].namestore,
        });
  
        if (!response.data.success) {
          console.error("Lỗi liên kết prevhash:", response.data.message);
          throw new Error(response.data.message);
        }
      }
  
      toast.success("Đã mã hóa và liên kết thành công");
    } catch (error) {
      console.error("Lỗi handleHash:", error);
      toast.error("Lỗi: " + error.message);
    }
  };
  
  const isValid = async ()=>{
    for(let i=1;i<list.length;i++){
      const currentblock = list[i]
      const prevblock= list[i-1]

      if(currentblock.prevhash!=prevblock.hash){
        toast.error("dữ liệu đã bị sửa")
        return 
      }
      
    }

    toast.success("Dữ liệu vẫn an toàn")
  }

  return (
    <div className='storepage'>
        <button onClick={()=>setSwitch(!switchbtn)}>Danh sách kho</button>
        <button onClick={()=>setSwitch(!switchbtn)}>Thêm nhà kho</button>
        <button onClick={()=>handleHash()}>Mã hóa</button>
        <button onClick={()=>isValid()}>Kiểm tra xem các nhà kho có an toàn không</button>
        {switchbtn?<CreateStore url={url}/>:<ListStore url={url}/>}
        
    </div>
  )
}

export default Store