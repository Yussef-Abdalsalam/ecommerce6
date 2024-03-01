import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";


export let ietmCartContext = createContext();

export default function IetmCartContextProvider({children}) {
    const [cart, setCart] = useState(0)

    function ietmCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((data) => {
            setCart(data)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        ietmCart()
    }, [])
    return <ietmCartContext.Provider value={{ cart, setCart }}>

        {children}

    </ietmCartContext.Provider>
} 