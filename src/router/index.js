import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import App from '../App'
import News from '../components/news/News'
import Entry from '../components/news/Entry'

const Index = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="novedades" element={<News />} />
      <Route path="novedades/:id" element={<Entry />} />
    </Routes>
  </BrowserRouter>
)
export default Index
