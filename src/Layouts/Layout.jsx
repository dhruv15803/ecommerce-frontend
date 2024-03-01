import { Outlet } from "react-router-dom";

import React from 'react'
import Navbar from "../Components/Navbar";

const Layout = ({cart,categories}) => {
  return (
    <>
    <Navbar cart={cart} categories={categories}/>
    <Outlet/>
    </>
  )
}

export default Layout