import React from "react";
import { Link } from "react-router-dom";
import { LoginContext, backendUrl } from "../App";
import { useContext } from "react";
import axios from "axios";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, setLoggedInUser, loggedInUser,isUserAdmin } =
    useContext(LoginContext);

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
          <div className="flex items-center gap-2 absolute right-5">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
