import axios from "axios"
import { createContext, useEffect, useState } from "react"
export const Storecontext = createContext(null)

const StorecontextProvider=(props)=>{

    const [token,setToken]= useState("")
    const [type,setType]= useState("")

    const url = 'http://localhost:4000'
   

    const contextValue = {
        
        url,
        token,
        setToken,
        type,
        setType
    }

    

    return (
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>
    )
}

export default StorecontextProvider;