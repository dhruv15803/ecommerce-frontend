import React, { useEffect, useState } from "react";
import { Link,NavLink } from "react-router-dom";
import { LoginContext, backendUrl } from "../App";
import { useContext } from "react";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import Cart from "../Pages/Cart";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, setLoggedInUser, loggedInUser,isUserAdmin } = useContext(LoginContext);

  const [isShowHamburger,setIsShowHamburger] = useState(false);
  const [categories,setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/category/getAll`);
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, [categories]);

  const logoutUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setIsLoggedIn(false);
        setLoggedInUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="flex border-2 p-2 items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/">Shopify</Link>
        </div>
        {!isLoggedIn && (
          <div className="flex items-center gap-2 absolute right-10">
            <Link to="/login">
              <button>Login</button>
            </Link>
            {/* <Link to="/register">
              <button>Register</button>
            </Link> */}
          </div>
        )}
        <div className="flex items-center gap-4">
        {isLoggedIn && (
            <>
            <Link to='/profile'>
            <div className="flex items-center gap-2">
                <img className=' w-8 h-8 rounded-full' src={loggedInUser?.avatar} alt="user-avatar"/>
                <p className="font-semibold">{loggedInUser.username}</p>
            </div>
            </Link>
            </>
        )}
        {(isLoggedIn && isUserAdmin) && 
        <>
        <Link to='/Admin'><button>Admin</button></Link>
        </>}
        {isLoggedIn && (
          <div className="flex items-center">
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
        <div className="flex items-center">
          <button onClick={()=>setIsShowHamburger(!isShowHamburger)} className="text-xl">
            <GiHamburgerMenu/>
          </button>
        </div>
        </div>
      </nav>
      {isShowHamburger && <div className="flex flex-col gap-1  bg-gray-400 text-white">
        <div className="border-2 b-2 p-4">
          <NavLink to='/cart' onClick={()=>setIsShowHamburger(false)} className={({isActive})=>isActive ? 'text-gray-200':'text-white'}>cart</NavLink>
        </div>
        {categories?.map((item,i) => {
          return <div onClick={()=>setIsShowHamburger(false)} className="border-b-2 p-4" key={i}><NavLink to={`/products/${item.categoryName}`} className={({isActive})=>isActive ? 'text-gray-200':'text-white'}>{item.categoryName}</NavLink></div> 
        })}
      </div>}
    </>
  );
};

export default Navbar;
