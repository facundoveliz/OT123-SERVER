import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useUser from '../hooks/useUser'

const PrivateRoute = () => {
  const { isLoggedIn } = useUser()

  if (!isLoggedIn) {
    return <Navigate replace to="/" />
  }
  return <Outlet />
}

export default PrivateRoute
