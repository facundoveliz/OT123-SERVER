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
import News from '../components/news/News'
import Detail from '../components/pageUtils/Detail'
import Testimonials from '../components/testimonials/Testimonials'
import Activities from '../components/activitiesForm/Activities'
import Members from '../components/members/Members'

const PublicRoutes = () => {
  const location = useLocation()

  return (
    <AnimatedPage>
      <Routes key={location.pathname} location={location}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />

        <Route path="novedades">
          <Route index element={<News />} />
          <Route path=":id" element={<Detail />} />
        </Route>
        <Route path="testimonios">
          <Route index element={<Testimonials />} />
          <Route path=":id" element={<Detail />} />
        </Route>
        <Route path="actividades">
          <Route index element={<Activities />} />
          <Route path=":id" element={<Detail />} />
        </Route>
        <Route path="nosotros">
          <Route index element={<Members />} />
          <Route path=":id" element={<Detail />} />
        </Route>

      </Routes>
    </AnimatedPage>
  )
}

export default PublicRoutes
