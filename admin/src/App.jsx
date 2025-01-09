import React, { useState } from 'react'
import {  Chatpage, Createship, Loginpopup, Navbar, Notifications, Sidebar, StoreDetails } from './components'
import {Routes,Route} from 'react-router-dom'
import { Add, List, Order, Plan, Store, Task } from './pages'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { Storecontext } from './context/Storecontext';
import './App.css'
import Ship from './pages/Ship/Ship';
const App = () => {
  const url = "http://localhost:4000"
  const [showLogin,setShowLogin]=useState(false)
  const {type}=useContext(Storecontext)
  return (
    <div>
      {showLogin?<Loginpopup setShowlogin={setShowLogin}/>:<></>}
      <ToastContainer/>
      <Navbar setShowlogin={setShowLogin}/>
      <hr/>
      <div className='app-content'>
        <Sidebar type={type}/>

        <Routes>
            <Route path="/add" element={<Add url={url}/>}/>
            <Route path="/list" element={<List url={url}/>}/>
            <Route path="/order" element={<Order url={url}/>}/>
            <Route path="/plan" element={<Plan url={url}/>}/>
            <Route path="/chatpage" element={<Chatpage url={url}/>}/>
            <Route path="/store" element={<Store/>}/>
            <Route path='/notifications' element={<Notifications url={url}/>}/>
            <Route path='/storedetail/:id' element={<StoreDetails url={url}/>}/>
            <Route path='/manageship' element={<Ship url={url}/>}/>
            <Route path='/createship' element={<Createship url={url}/>}/>
            <Route path='/managetask' element={<Task url={url}/>}/>
        </Routes>
        {type==""?(
          <h1>Chào mừng bạn đến với trang quản lý</h1>
        ):<></>}
      </div>
    </div>
  )
}

export default App