import React, { useState } from 'react'
import { Loginpopup, Navabar } from './components'
import { Route, Routes } from 'react-router-dom'
import { Cart, Home, Myorders, Placeorder} from './pages'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [showLogin,setShowLogin]=useState(false)

  return (
    <>
      {showLogin?<Loginpopup setShowlogin={setShowLogin}/>:<></>}
      <ToastContainer/>
      <div className='app'>
      <Navabar setShowlogin={setShowLogin}/>

      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/placeorder' element={<Placeorder/>}/>
          <Route path='/myorder' element={<Myorders/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App