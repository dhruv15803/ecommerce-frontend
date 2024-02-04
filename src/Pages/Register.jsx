import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");


  console.log(avatar);
  const navigate = useNavigate();

  const registerFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/user/register`,
        {
          email,
          username,
          password,
          avatar,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if(response.data.success){
        setTimeout(()=>{
            navigate('/login');
        },3000)
      }
    } catch (error) {
      console.log(error);
    }
  };

//   const handleFileChange = (e)=>{
//     console.log(typeof e.target.files[0]);
//     setAvatar(e.target.files[0]);
//   }

  return (
    <>
      <div className="border-2 my-24 mx-4 p-4 rounded-lg shadow-xl">
        <form onSubmit={registerFormSubmit} className="flex flex-col">
        <input onChange={(e) => setAvatar(e.target.files[0])} type="file" name="avatar" id="avatar"/>
          <input
            value={username}
            className="p-2 border-2 my-2 rounded-md"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
          />
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
          <button className="border-2 rounded-lg w-fit mx-auto px-4 py-2 border-black hover:bg-black hover:text-white hover:duration-300">
            register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
