import React, { useContext, useEffect, useRef } from 'react'
import LoginForm from '../../Components/auth/LoginForm'
import { AuthContext } from '../../context/AuthContext'
const Login = () => {
  const { isAuth } = useContext(AuthContext);
  if(isAuth){

    return
  }
  return (
    <LoginForm/>
  )
}

export default Login