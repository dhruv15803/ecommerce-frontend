import React from "react";
import { LoginContext, backendUrl } from "../App";
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {useContext} from 'react'
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMsg,setLoginErrorMsg] = useState("");

  const navigate = useNavigate();
  const {isLoggedIn,setIsLoggedIn,setLoggedInUser,setIsUserAdmin} = useContext(LoginContext);



  const loginFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if(response.data.success){
        setIsLoggedIn(true);
        setLoggedInUser(response.data.user);
        setIsUserAdmin(response.data.user.isAdmin);
        navigate('/');
      }
    } catch (error) {
      setLoginErrorMsg("Enter correct username and password");
      setTimeout(()=>{
        setLoginErrorMsg("");
      },3000)
      console.log('login error',error);
    }
  };

  return (
    <>
      <div className="border-2 my-24 mx-4 p-4 rounded-lg shadow-xl">
        <form onSubmit={loginFormSubmit} className="flex flex-col">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-2 my-2 rounded-md"
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border-2 my-2 rounded-md"
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <div className="flex justify-center my-2 text-red-500">
            {loginErrorMsg}
          </div>
          <div className="flex justify-center my-2">
            Don't have an account ?<Link to='/register' className="mx-1 text-blue-500">Click here</Link>
          </div>
          <button className="border-2 rounded-lg w-fit mx-auto px-4 py-2 border-black hover:bg-black hover:text-white hover:duration-300">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
