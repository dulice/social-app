import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../pages/Login';

const UserProtect = ({children}) => {
    const user = useSelector(state => state.user.user);
  return ( user ? children : <Login /> )
}

export default UserProtect;