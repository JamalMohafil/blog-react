import React from 'react'
import { Outlet } from 'react-router'
import Header from '../Components/layout/Header'

const AuthLayout = () => {
  return (
    <>
    <Header/>
    <main className='auth-layout'>
        <Outlet/>
    </main>
    </>
  )
}

export default AuthLayout