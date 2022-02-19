/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NotFound from '../pages/notFound/NotFound'
import useUser from '../hooks/useUser'

const AdminRoute = () => {
  const navigate = useNavigate()
  const reduxData = useUser()
  const [role, setRole] = useState(3)

  useEffect(() => {
    if (reduxData.userData.payload.userData) {
      setRole(reduxData.userData.payload.userData.dataValues.roleId)
      if (reduxData.userData.payload.userData.dataValues.roleId !== 1) navigate('/')
    }
  }, [])
  return (

    role === 1 ? <Outlet /> : <NotFound />

  )
}

export default AdminRoute
