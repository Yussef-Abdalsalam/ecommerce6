import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import Products from './Components/Products/Products.jsx'
import ProductsPage2 from './Components/Products/ProductsPage2.jsx'
import Cart from './Components/Cart/Cart.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import { tokenContext } from './Context/TokenContext.js'
import ProtectedRoutec from './Components/ProtectedRoutec/ProtectedRoutec.jsx'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import Address from './Components/Address/Address.jsx'
import Catrgories from './Components/Catrgories/Catrgories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Orders from './Components/Orders/Orders.jsx'
import WishList from './Components/WishList/WishList.jsx'
import Forgot from './Components/Forgot/Forgot.jsx'
import ForgotCode from './Components/Forgot/ForgotCode.jsx'
import ForgetPassword from './Components/Forgot/ForgetPassword.jsx'
import UpdatePassword from './Components/UpdatePassword/UpdatePassword.jsx'
import CashOrder from './Components/Address/CashOrder.jsx'
import CatgoriesDetails from './Components/CatgoriesDetails/CatgoriesDetails.jsx'
import BrandsDetails from './Components/BrandsDetails/BrandsDetails.jsx'
import HomeNoLogin from './Components/HomeNoLogin/HomeNoLogin.jsx'

export default function App() {

  let {setToken} = useContext(tokenContext)

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"))
    }
  }, [])
  
  let routes = createBrowserRouter([{
    path:"", element:<Layout/>,children:([
      {index: true, element: <ProtectedAuth><HomeNoLogin/></ProtectedAuth> },
      {path:"home", element: <ProtectedRoutec><Home/></ProtectedRoutec> },
      {path:"register", element: <ProtectedAuth><Register/></ProtectedAuth>},
      {path:"login", element: <ProtectedAuth><Login/></ProtectedAuth>},
      {path:"products", element: <ProtectedRoutec><Products/></ProtectedRoutec>},
      {path:"products/productsPage2", element: <ProtectedRoutec><ProductsPage2/></ProtectedRoutec>},
      {path:"cart", element: <ProtectedRoutec><Cart/></ProtectedRoutec>},
      {path:"Address/:cartId", element: <ProtectedRoutec><Address/></ProtectedRoutec>},
      {path:"cashOrder/:cartId", element: <ProtectedRoutec><CashOrder/></ProtectedRoutec>},
      {path:"catrgories", element: <ProtectedRoutec><Catrgories/></ProtectedRoutec>},
      {path:"brands", element: <ProtectedRoutec><Brands/></ProtectedRoutec>},
      {path:"wishList", element: <ProtectedRoutec><WishList/></ProtectedRoutec>},
      {path:"allorders", element: <ProtectedRoutec><Orders/></ProtectedRoutec>},
      {path:"details/:id", element: <ProtectedRoutec><ProductDetails/></ProtectedRoutec>},
      {path:"catrgories/detailsCatrgories/:id", element: <ProtectedRoutec><CatgoriesDetails/></ProtectedRoutec>},
      {path:"brands/brandsDetails/:id", element: <ProtectedRoutec><BrandsDetails/></ProtectedRoutec>},
      {path:"updatePassword", element: <UpdatePassword/>},
      {path:"forgot", element: <Forgot/>},
      {path:"forgotCode", element:<ForgotCode/>},
      {path:"forgetPassword", element:<ForgetPassword/>},


      {path:"*", element:<NotFound/>},
    ])
  }])
  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}
