import React from 'react'
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import AnimatedPage from '../components/transitions/AnimatedPage'
import Home from '../pages/Home'
import SignUp from '../pages/signup/SignUpForm'
import SignIn from '../pages/signin/SignInForm'
import ContactPage from '../pages/contact/ContactPage'
import TestimonialList from '../pages/backoffice/testimonials/ListTestimonials'
import TestimonialForm from '../components/testimonials/TestimonialForm'
import ListNews from '../pages/backoffice/news/ListNews'

const PublicRoutes = () => {
  const location = useLocation()

  return (
    <AnimatedPage>
      <Routes key={location.pathname} location={location}>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="testimonios" element={<TestimonialList />} />
        <Route path="testimonioform" element={<TestimonialForm />} />
        <Route path="novedades" element={<ListNews />} />
        <Route path="" element={<Home />} />
      </Routes>
    </AnimatedPage>
  )
}

export default PublicRoutes
