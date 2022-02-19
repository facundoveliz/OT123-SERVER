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
  
  return (

    role === 1 ? <Outlet /> : <NotFound />

  )
}

export default AdminRoute
