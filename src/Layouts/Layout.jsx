import { Outlet } from "react-router-dom";

import React from 'react'
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Layout = ({cart,categories}) => {
  return (
    <>
    <Navbar cart={cart} categories={categories}/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout