import React, {useContext, useEffect, useState } from 'react'
import { LoginContext, backendUrl } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const {loggedInUser} = useContext(LoginContext);
  console.log(loggedInUser);
  const [isUsernameEdit,setIsUsernameEdit] = useState(false);
  const [username,setUsername] = useState("");

  const toggleEditProfileUsername = ()=>{
    setIsUsernameEdit(!isUsernameEdit);
    setUsername(loggedInUser.username);
  }

  const editProfileUsername = async ()=>{
try {
      const response = await axios.patch(`${backendUrl}/user/editUsername`,
      {
        newUsername:username,
      },{withCredentials:true})
      console.log(response);
      setUsername(response.data.newUsername);
      setIsUsernameEdit(false);
      window.location = '/profile';
} catch (error) {
  console.log(error);
}
}

  return (
    <>
    <div className='m-2 p-2 text-2xl font-bold'>
      Profile
    </div>
    {loggedInUser!==null && <div className='m-4 border-2 flex flex-col gap-2 p-4 rounded-xl shadow-lg'>
      <img src={loggedInUser.avatar} className='w-[50%] rounded-full mx-auto' alt="" />
      <div className='text-xl font-semibold'>Email</div>
      <div className='flex items-center'>
        <p>{loggedInUser.email}</p>
      </div>
      <div className='text-xl font-semibold'>Username</div>
      <div className='flex gap-2 items-center'>
        {isUsernameEdit ? <input className='border-2 rounded-lg' value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="username" id=""/>:<p>{username!=="" ? username : loggedInUser.username}</p> }
        <button onClick={toggleEditProfileUsername} className='border-2 rounded-lg border-black hover:bg-black hover:text-white hover:duration-300 px-4'>{isUsernameEdit ? "Cancel" : "Edit"}</button>
        {isUsernameEdit &&  <button onClick={editProfileUsername} className='border-2 rounded-lg border-black hover:bg-black hover:text-white hover:duration-300 px-4'>Submit</button>}
      </div>
    </div>}
    </>
  )
}

export default Profile