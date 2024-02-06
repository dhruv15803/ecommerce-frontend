import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link,NavLink } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
    <div className='flex my-8 mx-4 gap-4 border-b-2 border-black p-2'>
        <NavLink end to=''  className={({isActive})=>isActive?'text-black':'text-gray-400'} ><button>products</button></NavLink>
        <NavLink  to='category' className={({isActive})=>isActive?'text-black':'text-gray-400'} ><button>category</button></NavLink>
    </div>
    <Outlet/>
    </>
  )
}

export default AdminLayout;
