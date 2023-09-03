import React, { useContext } from 'react'
import SignUpForm from '../../Components/auth/SignUpForm'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext'

const SignUp = () => {
  

  return (
    <SignUpForm/>
  )
}

export default SignUp