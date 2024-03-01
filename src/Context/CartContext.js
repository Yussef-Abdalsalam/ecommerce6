import axios from "axios";
import toast from "react-hot-toast";
import { createContext, useContext } from "react";
import { ietmCartContext } from "./IetmCart";



export let cartContext = createContext();



export default function CartContextProvider(props) {
    let { setCart } = useContext(ietmCartContext);
    function addToCart(id) {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: id
        }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }).then((data) => {
            setCart(data)
            toast.success(' Product Add Cart Success!')
        }).catch((err) => {
            toast.err("This didn't work.")
        })
    }
    return <cartContext.Provider value={{ addToCart }}>

        {props.children}

    </cartContext.Provider>
} 
