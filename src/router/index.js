import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

// eslint-disable-next-line import/no-cycle
import App from '../App'
import ContactsList from '../pages/contact/ContactsList'
import SignIn from '../pages/signin/SignInForm'
import SignUp from '../pages/signup/SignUpForm'
import Home from '../pages/Home'
import TestimonialForm from '../components/testimonials/TestimonialForm'

const AllRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/backoffice/contacts" element={<ContactsList />} />
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/testimonialform" element={<TestimonialForm />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>
)

export default AllRoutes
