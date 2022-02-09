import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

// eslint-disable-next-line import/no-cycle
import App from '../App'
// import Home from '../pages/Home'
import SignIn from '../pages/signin/SignInForm'
import SignUp from '../pages/signup/SignUpForm'

const AllRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
)

export default AllRoutes
