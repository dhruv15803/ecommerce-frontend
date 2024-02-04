import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link,NavLink } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
    <div className='flex my-8 mx-4 gap-4 border-b-2 border-black p-2'>
        <Link to='/Admin'><button>products</button></Link>
        <Link to='/Admin/category'><button>category</button></Link>
    </div>
    <Outlet/>
    </>
  )
}

export default AdminLayout;
