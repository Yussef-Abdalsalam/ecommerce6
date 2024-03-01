import axios from "axios";
import toast from "react-hot-toast";
import { createContext, useContext } from "react";
import { ietmWishListContext } from "./IetmWishList";


export let wishListContext = createContext();


export default function WishListContextProvider(props) {
    let { setWishList } = useContext(ietmWishListContext);

    function addToWishList(id) {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: id
        }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((data) => {
            toast.success(' Product Add WishList Success!')
            setWishList(data)
        }).catch((err) => {
            toast.err("This didn't work.")
        })
    }


    return <wishListContext.Provider value={{ addToWishList }}>

        {props.children}

    </wishListContext.Provider>
}

