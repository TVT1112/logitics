import React, { useState } from 'react'
import { BiUpload } from "react-icons/bi";
import axios from 'axios'
import './Add.css'
import { toast } from 'react-toastify';
const Add = ({url}) => {
   const [image,setImage]= useState(false)
   const [data,setData]= useState({
        name:"",
        description:"",
        price:"",
        category:"Điện thoại"
   })

   const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value= event.target.value;
        setData(data=>({...data,[name]:value}))
   }

   const onSubmitHandler= async (event)=>{
        event.preventDefault();
        const formData= new FormData()
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        //thêm dữ liệu
        const response= await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success){
            setData(
                {
                    name:"",
                    description:"",
                    price:"",
                    category:"Điện thoại"
               }
            )
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }

   }


  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className='add-img-upload flex-col'>
                <p>Tải hình ảnh</p>
                <label htmlFor='image'>
                        {image?<img src={URL.createObjectURL(image)}/>:<BiUpload className='form-icon'/>}
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
            </div>
            <div className='add-product-name flex-col'>
                <p>Tên sản phẩm</p>
                <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='nhập tên'/>
            </div>
            <div className='add-product-description flex-col'>
                <p>Mô tả sản phẩm</p>
                <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='viết mô tả ở đây'></textarea>
            </div>

            <div className='add-category-price'>
                <div className='add-category flex-col'>
                    <p>Kiểu sản phẩm</p>
                    <select onChange={onChangeHandler}  name='category'>
                        <option value="Điện thoại">Điện thoại</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Sạc">Sạc</option>
                        <option value="Tai nghe">Tai nghe</option>
                    </select>
                </div> 
                <div className='add-price flex-col'>
                <p>Giá sản phẩm</p>
                <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='000vnđ'/>
            </div>
            </div>

           


            <button type='submit' className='add-btn'>Thêm sản phẩm</button>
        </form>
    </div>
  )
}

export default Add