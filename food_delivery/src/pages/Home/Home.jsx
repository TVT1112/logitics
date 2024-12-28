import React, { useState } from 'react'
import { Exploremenu, Header } from '../../components'
import FoodDisplay from '../../components/Fooddisplay/FoodDisplay';

const Home = () => {

  const [category,setCategory]= useState("All");


  return (
    <div>
      <Header/>
      <Exploremenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home