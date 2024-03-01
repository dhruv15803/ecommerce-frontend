import { Outlet } from "react-router-dom";

import React from 'react'
import Navbar from "../Components/Navbar";

const Layout = ({cart}) => {
  return (
    <>
    <Navbar cart={cart}/>
    <Outlet/>
    </>
  )
}

export default Layout