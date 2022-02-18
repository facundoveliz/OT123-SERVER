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
// import ContactPage from '../pages/contact/ContactPage'
import News from '../components/news/News'
import Entry from '../components/news/Entry'

const PublicRoutes = () => {
  const location = useLocation()

  return (
    <AnimatedPage>
      <Routes key={location.pathname} location={location}>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="backoffice/novedades">
          <Route index element={<News />} />
          <Route path=":id" element={<Entry />} />
        </Route>
        <Route path="" element={<Home />} />
      </Routes>
    </AnimatedPage>
  )
}

export default PublicRoutes
