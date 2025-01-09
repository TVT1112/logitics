import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { jwtDecode} from 'jwt-decode';
export const Storecontext = createContext(null)

const StorecontextProvider=(props)=>{

    const [token,setToken]= useState("")
    const [type,setType]= useState("")
    const [currentUser, setCurrentUser] = useState(null); // Thông tin người dùng hiện tại

    const url = 'http://localhost:4000'
   
    const decodeToken = (jwtToken) => {
        try {
          const userData = jwtDecode(jwtToken);
          return userData; // Dữ liệu người dùng từ token (vd: { _id, name, email, type })
        } catch (error) {
          console.error("Lỗi giải mã token:", error);
          return null;
        }
      };
    
      // Theo dõi sự thay đổi của token
      useEffect(() => {
        if (token) {
          const userData = decodeToken(token);
          setCurrentUser(userData);
        } else {
          setCurrentUser(null);
        }
      }, [token]);

    const contextValue = {
        
        url,
        token,
        setToken,
        type,
        setType,
        currentUser,
    }

    

    return (
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>
    )
}

export default StorecontextProvider;