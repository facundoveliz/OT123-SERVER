
import React from 'react'
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PublicRoutes from './public'
import AnimatedPage from '../components/transitions/AnimatedPage'
import AuthRoutes from './auth'
import AdminRoutes from './admin'
import Layout from '../pages/layout/Layout'

const AllRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <AnimatedPage>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<PublicRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Route>

        </Routes>
      </AnimatedPage>
    </AnimatePresence>
  )
}

export default AllRoutes
