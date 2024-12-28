import React from 'react'
import { Storecontext } from '../../context/Storecontext'
import { BiArrowBack } from "react-icons/bi";
import axios from 'axios'
import { useState } from 'react';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import './Loginpopup.css'

const Loginpopup = ({setShowlogin}) => {
    const [currState,setCurrState]= useState("Đăng kí")
    const {url,token,setToken,setType,type} = useContext(Storecontext)
    const navigate= useNavigate()

    const [data, setData ]= useState({
        name:"",
        email:"",
        password:"",
        type:"Admin"
    })

   

    const onChangeHandler = (event)=>{
        const name= event.target.name
        const value= event.target.value

        setData(data=>({
            ...data,
            [name]:value
        }))
    }

    const onLogin = async (event)=>{
        event.preventDefault();
        let newUrl= url;
        if(currState==="Đăng nhập"){
            newUrl+= "/api/adminuser/login"
        }
        else{
            newUrl+= "/api/adminuser/register"
        }

        const response = await axios.post(newUrl,data)
        

        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowlogin(false)
            setType(response.data.data.type)
            if(currState==="Đăng nhập"){
                if(response.data.data.type==="Admin"){
                    navigate("/add")
                }
            }
        }
        else{
            alert(response.data.message)
        }
    }


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currState}</h2>
                <BiArrowBack className='login-icon' onClick={()=>setShowlogin(false)}/>
            </div>

            <div className='login-popup-inputs'>
                {currState==="Đăng nhập"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Tên của bạn' required/>}
                <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='email của bạn' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='mập khẩu của bạn' required/>
                {currState==="Đăng kí"?(
                    <select value={data.type} onChange={onChangeHandler} defaultValue={data.type} name='type'>
                        <option value="Admin" >quản lý toàn bộ chuỗi và chăm sóc khách hàng</option>
                        <option value="storehouser" >quản lý kho</option>
                    </select>
                ):<></>}
            </div>

            <button type='submit'>
                {currState==="Đăng kí"?"Tạo tài khoản":"Đăng nhập"}
            </button>
            {currState==="Đăng nhập"?
                <p>Tạo tài khoản? <span onClick={()=>setCurrState("Đăng kí")}>Nhấn ở đây</span> </p>:
                <p>Đã có tài khoản <span onClick={()=>setCurrState("Đăng nhập")}>Đăng nhập ở đây</span></p>
            }
            
           
        </form>
    </div>
  )
}

export default Loginpopup