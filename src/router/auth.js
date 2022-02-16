import React from 'react'
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import PrivateRoute from '../hoc/PrivateRoute'
import AnimatedPage from '../components/transitions/AnimatedPage'
// EXAMPLE ROUTES
import Home from '../pages/Home'
import SignUp from '../pages/signup/SignUpForm'
import SignIn from '../pages/signin/SignInForm'
import ContactPage from '../pages/contact/ContactPage'
import TestimonialList from '../pages/backoffice/testimonials/ListTestimonials'
import TestimonialForm from '../components/testimonials/TestimonialForm'
import ListNews from '../pages/backoffice/news/ListNews'

const AuthRoutes = () => {
  const location = useLocation()

  return (
    <AnimatedPage>
      <Routes key={location.pathname} location={location}>
        <Route path="" element={<PrivateRoute />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="contactpage" element={<ContactPage />} />
          <Route path="testimonials" element={<TestimonialList />} />
          <Route path="testimonialForm" element={<TestimonialForm />} />
          <Route path="novedades" element={<ListNews />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </AnimatedPage>
  )
}

export default AuthRoutes
