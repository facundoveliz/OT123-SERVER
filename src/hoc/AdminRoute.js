import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useUser from '../hooks/useUser'

// A wrapper for <Route> that redirects to the home
// screen if you're not admin.

const AdminRoute = () => {
  const { userData } = useUser()

  if (!userData) return <Navigate to="/" />
  return userData.payload.userData.userRole === 'Admin' ? <Outlet /> : <h2>No tienes permiso para ver esta seccion </h2>
}

export default AdminRoute
