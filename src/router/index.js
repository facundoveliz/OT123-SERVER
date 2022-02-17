import React from 'react'
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
// eslint-disable-next-line import/no-cycle
import App from '../App'
import News from '../components/news/News'
import Entry from '../components/news/Entry'
import ContactsList from '../pages/contact/ContactsList'
import SignIn from '../pages/signin/SignInForm'
import SignUp from '../pages/signup/SignUpForm'
import Home from '../pages/Home'
import AP from '../components/AnimatedPage'
import TestimonialForm from '../components/testimonials/TestimonialForm'
import ListCategories from '../pages/backoffice/categories/ListCategories'

const AllRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<AP><Home /></AP>} />
        <Route path="/signin" element={<AP><SignIn /></AP>} />
        <Route path="/signup" element={<AP><SignUp /></AP>} />
        <Route path="/backoffice/contacts" element={<AP><ContactsList /></AP>} />
        <Route path="/backoffice/categories" element={<AP><ListCategories /></AP>} />
        <Route path="/testimonialform" element={<AP><TestimonialForm /></AP>} />
        <Route path="novedades" element={<News />} />
        <Route path="novedades/:id" element={<Entry />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AllRoutes
