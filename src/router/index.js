import React from 'react'
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AnimatedPage from '../components/transitions/AnimatedPage'
import PublicRoutes from './public'
import AuthRoutes from './auth'

const AllRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <AnimatedPage>
        <Routes key={location.pathname} location={location}>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
      </AnimatedPage>
    </AnimatePresence>
  )
}

export default AllRoutes
