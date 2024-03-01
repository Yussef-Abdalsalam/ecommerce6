import React from 'react'
import NavBar from '../NavBar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  return (
    <>

    <NavBar/>
    <Outlet/>
    <Footer/>

    </>
  )
}
