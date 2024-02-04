import React from 'react'
import { LoginContext } from '../App'
import {useContext} from 'react'

const Profile = () => {

    const {loggedInUser} = useContext(LoginContext);
    console.log(loggedInUser);

  return (
    <>
    </>
  )
}

export default Profile