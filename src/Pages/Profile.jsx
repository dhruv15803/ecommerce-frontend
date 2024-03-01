import React, {useContext, useEffect, useState } from 'react'
import { LoginContext, backendUrl } from '../App';
import axios from 'axios';
import bcrypt from 'bcryptjs'

const Profile = () => {

  const {loggedInUser} = useContext(LoginContext);
  console.log(loggedInUser);
  const [isUsernameEdit,setIsUsernameEdit] = useState(false);
  const [isPasswordEdit,setIsPasswordEdit] = useState(false);
  const [username,setUsername] = useState("");
  const [oldPassword,setOldPassword] = useState("");
  const [isCorrectOldPassword,setIsCorrectOldPassword] = useState(false);
  const [newPassword,setNewPassword] = useState("");
  const [passwordUpdateMsg,setPasswordUpdateMsg] = useState("");

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

  const checkOldPassword = async ()=>{
    const flag = bcrypt.compareSync(oldPassword,loggedInUser?.password);
    setIsCorrectOldPassword(flag);
  }

  const editProfilePassword = async ()=>{
    const response = await axios.patch(`${backendUrl}/user/editPassword`,
    {
      newPassword,
    },
    {withCredentials:true}
    )
    console.log(response);
    if(response.status===200){
      setPasswordUpdateMsg("successfully updated password");
    }
    setIsPasswordEdit(false);
    window.location = '/profile';
  }

  useEffect(()=>{
    checkOldPassword();
  },[oldPassword])

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
      </div>
      {isUsernameEdit &&  <button onClick={editProfileUsername} className='border-2 rounded-lg border-black hover:bg-black hover:text-white hover:duration-300 px-4'>Submit</button>}
      <div className='text-blue-500 font-semibold'>
      <button onClick={()=>setIsPasswordEdit(!isPasswordEdit)}>{isPasswordEdit ? "Cancel" : "edit password"}</button>
      </div>
      {isPasswordEdit && 
      <>
      <input value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} type="password" name="oldPassword" id="" placeholder='Enter old password' className='border-2 p-2 rounded-lg'/>
      {isCorrectOldPassword && 
      <>
      <input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} type="password" name="newPassword" id="" placeholder='Enter new password' className='border-2 p-2 rounded-lg'/>
      <button onClick={editProfilePassword}>Submit</button>
      {passwordUpdateMsg}
      </>}
      </>}
    </div>}
    </>
  )
}

export default Profile