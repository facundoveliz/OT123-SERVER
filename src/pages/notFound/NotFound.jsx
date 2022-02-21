/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { useNavigate } from 'react-router'
import './NotFound.css'

const NotFound = () => {
  const navigate = useNavigate()
  const onNavigate = () => {
    navigate('/')
  }
  return (
    <div className="not-found">
      <h1 className="title">
        Esta pagina no existe o no tienes acceso
      </h1>
      <p>
        Puedes regresar a la home haciendo click
        {' '}
        <span clasName="link" onClick={() => { onNavigate() }}>aqui</span>
        {' '}
      </p>
    </div>
  )
}

export default NotFound
