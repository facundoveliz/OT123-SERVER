/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserData } from '../app/slices/auth'
import useUser from '../hooks/useUser'

const AdminRoute = () => {
  const userData = useSelector(getUserData)
  const { isLoggedIn } = useUser()
  let role = 0
  if (!isLoggedIn) {
    role = userData.payload.persistedReducer.userData?.dataValues.roleId
  }
  if (role !== 1) {
    return <h2>No tienes permiso</h2>
  }
  return <Outlet />
}

export default AdminRoute
