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
import Profile from '../pages/profile/Profile'
import ContactsList from '../pages/contact/ContactsList'
import ListCategories from '../pages/backoffice/categories/ListCategories'
import TestimonialList from '../pages/backoffice/testimonials/ListTestimonials'
import TestimonialForm from '../components/testimonials/TestimonialForm'
import News from '../pages/backoffice/news/ListNews'
import Entry from '../components/news/Entry'

const AuthRoutes = () => {
  const location = useLocation()

  return (
    <AnimatedPage>
      <Routes key={location.pathname} location={location}>
        <Route path="" element={<PrivateRoute />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="testimonios" element={<TestimonialList />} />
          <Route path="testimonioform" element={<TestimonialForm />} />
          <Route path="backoffice/contactos" element={<ContactsList />} />
          <Route path="backoffice/categorias" element={<ListCategories />} />
          <Route path="novedades" element={<News />} />
          <Route path="novedades:id" element={<Entry />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </AnimatedPage>
  )
}

export default AuthRoutes
