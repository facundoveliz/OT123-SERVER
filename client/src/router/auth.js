import React from 'react'
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import PrivateRoute from '../hoc/PrivateRoute'
import AnimatedPage from '../components/transitions/AnimatedPage'
import Profile from '../pages/profile/Profile'
import EditProfile from '../pages/profile/EditProfile'

const AuthRoutes = () => {
  const location = useLocation()

  return (
    <AnimatedPage>
      <Routes key={location.pathname} location={location}>
        <Route path="" element={<PrivateRoute />}>
          <Route path="perfil" element={<Profile />} />
          <Route path="editarperfil/:id" element={<EditProfile />} />
        </Route>
      </Routes>
    </AnimatedPage>
  )
}

export default AuthRoutes
