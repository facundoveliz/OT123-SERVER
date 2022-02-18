import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserData } from '../app/slices/auth'

const AdminRoute = () => {
  const userData = useSelector(getUserData)
  const { roleId } = userData.payload.userData.dataValues

  if (roleId !== 1) {
    return <Navigate replace to="/" />
  }
  return <Outlet />
}

export default AdminRoute
