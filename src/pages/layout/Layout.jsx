import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Alert from '../../components/alert/Alert'
import Footer from '../../components/Footer'
import Header from '../../components/navbar/Header'
import { getAlertData } from '../../app/slices/alert';

const Layout = () => {
  const alertData = useSelector(getAlertData)

  const alert = alertData.payload.alert.alertData

  return (
    <div>
      <Alert {...alert} />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
