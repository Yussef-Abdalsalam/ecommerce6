import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";


export let ietmWishListContext = createContext();

export default function IetmWishListContextProvider({children}) {
    const [wishList, setWishListt] = useState(0)

    function ietmWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((data) => {
            setWishListt(data)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        ietmWishList()
    }, [])
    return <ietmWishListContext.Provider value={{ wishList, setWishListt }}>

        {children}

    </ietmWishListContext.Provider>
} 