import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import App from '../App'
import Home from '../pages/Home'
import Categories from '../pages/Categories'
import Activity from '../pages/backoffice/activities/Activity'

const Index = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        {/* <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
      </Route>
      <Route path="/backoffice/categories" element={<Categories />} />
      <Route path="/backoffice/activities:id" element={<Activity />} />
    </Routes>
  </BrowserRouter>
)
export default Index
