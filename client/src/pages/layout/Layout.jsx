/* eslint-disable no-console */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Image } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';
import Alert from '../../components/alert/Alert'
import Footer from '../../components/Footer'
import Header from '../../components/navbar/Header'
import { getAlertData } from '../../app/slices/alert';
import donar from '../../assets/png/donar.png'
import './Layout.css'

const Layout = () => {
  const alertData = useSelector(getAlertData)
  const navigate = useNavigate()
  const alert = alertData.payload.alert.alertData
  const path = useLocation().pathname.split('/')[1]
  useEffect(() => {
    if (path === '') navigate('/home')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Alert {...alert} />
      <Header />
      <Outlet />
      <Footer />
      { path !== 'contribuye'
      && (
      <Image
        className="donar"
        src={donar}
        onClick={() => navigate('/contribuye')}
      />
      )}
      <div className="heart" />

    </div>
  )
}

export default Layout
