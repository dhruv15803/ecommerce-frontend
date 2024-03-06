import React from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { useNavigate } from 'react-router-dom';

const Dialog = (props) => {

    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
          const response = await axios.get(`${backendUrl}/user/logout`, {
            withCredentials: true,
          });
          if (response.data.success) {
            props.setIsLoggedIn(false);
            props.setLoggedInUser(null);
            props.setIsShowHamburger(false);
            props.setIsAlertOpen(false);
            navigate('/');
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <>
    <div className='flex flex-col p-2 rounded-lg shadow-lg z-20'>
        <div className='flex flex-wrap font-semibold text-lg'>
            Are you sure you want to logout
        </div>
        <div className='flex gap-4'>
            <button onClick={logoutUser} className='border-2 border-black rounded-lg hover:bg-black px-2 hover:text-white hover:duration-300'>Yes</button>
            <button onClick={() => setIsLogoutConfirm(false)} className='border-2 border-black rounded-lg hover:bg-black px-2 hover:text-white hover:duration-300'>No</button>
        </div>
    </div>
    </>
)
}

export default Dialog