import axios from "axios"
import { createContext, useEffect, useState } from "react"
export const Storecontext = createContext(null)

const StorecontextProvider=(props)=>{

    const [cartItems,setCartItems]=useState({})
    const [token,setToken]= useState("")
    const [food_list,setFoodlist]=useState([])

    const url = 'http://localhost:4000'

    const addTocart= async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromcart= async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item);
                totalAmount += itemInfo.price*cartItems[item];
            }   
        }
        return totalAmount;
    }

    const fetchFoodlist = async()=>{
        const response= await axios.get(url+"/api/food/list")
        setFoodlist(response.data.data)
    }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)

    }

    useEffect(()=>{
        async function loadData() {
            try {
                await fetchFoodlist();
                const token = localStorage.getItem("token");
                if (token) {
                    setToken(token);
                    await loadCartData(token);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        }
        loadData()
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addTocart,
        removeFromcart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    

    return (
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>
    )
}

export default StorecontextProvider;