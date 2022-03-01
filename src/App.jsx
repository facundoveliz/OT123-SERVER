import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './router'
import './index.css'

const App = () => (
  <BrowserRouter>
    <AllRoutes />
  </BrowserRouter>
)

export default App
