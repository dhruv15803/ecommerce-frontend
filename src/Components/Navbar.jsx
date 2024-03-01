import React, { useEffect, useState } from "react";
import { Link,NavLink } from "react-router-dom";
import { LoginContext, backendUrl } from "../App";
import { useContext } from "react";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = ({cart}) => {
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
        setIsShowHamburger(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="flex border-2 p-2 items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/" onClick={()=>setIsShowHamburger(false)}>Shopify</Link>
        </div>
        {!isLoggedIn && (
          <div className="flex items-center gap-2 absolute right-10">
            <Link to="/login">
              <button onClick={()=>setIsShowHamburger(false)}>Login</button>
            </Link>
            {/* <Link to="/register">
              <button>Register</button>
            </Link> */}
          </div>
        )}
        <div className="flex items-center gap-4">
        {isLoggedIn && (
            <>
            <Link to='/profile' onClick={()=>setIsShowHamburger(false)}>
            <div className="flex items-center gap-2">
                <img className=' w-8 h-8 rounded-full' src={loggedInUser?.avatar} alt="user-avatar"/>
                <p className="font-semibold">{loggedInUser.username}</p>
            </div>
            </Link>
            </>
        )}
        {isLoggedIn && <div className="text-xl flex items-center gap-1">
          <Link to='/Cart'><FaShoppingCart/></Link>
          <div className="bg-red-500 text-white rounded-full text-sm px-2 relative right-2 bottom-2">{cart.length}</div>
          </div>}

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
        {(isLoggedIn && isUserAdmin) && 
        <div className="border-b-2 p-4">
        <NavLink to='/Admin'><button onClick={()=>setIsShowHamburger(false)} >Admin</button></NavLink>
        </div>}
        {categories?.map((item,i) => {
          return <div onClick={()=>setIsShowHamburger(false)} className="border-b-2 p-4" key={i}><NavLink to={`/products/${item.categoryName}`} className={({isActive})=>isActive ? 'text-gray-200':'text-white'}>{item.categoryName}</NavLink></div> 
        })}
      </div>}
    </>
  );
};

export default Navbar;
