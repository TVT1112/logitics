import React, { useState } from 'react'
import { Createship, Listship } from '../../components'
import './Ship.css'
const Ship = ({url}) => {
  return (   
        <div className='shipmanage'>
           <Listship url={url}/>
        </div>
  )
}

export default Ship