import React from 'react'
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
// eslint-disable-next-line import/no-cycle
import App from '../App'
// import Home from '../pages/Home'
import SignIn from '../pages/signin/SignInForm'
import SignUp from '../pages/signup/SignUpForm'
import Home from '../pages/Home'
import TestimonialForm from '../components/testimonials/TestimonialForm'
import AP from '../components/AnimatedPage'

const AllRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<AP><Home /></AP>} />
        <Route path="/signin" element={<AP><SignIn /></AP>} />
        <Route path="/signup" element={<AP><SignUp /></AP>} />
        <Route path="/testimonialform" element={<AP><TestimonialForm /></AP>} />
        <Route path="/app" element={<App />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AllRoutes
