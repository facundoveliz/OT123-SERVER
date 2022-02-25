import { Button } from '@chakra-ui/button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setAlertData } from '../app/slices/alert'
import useUser from '../hooks/useUser'

const LogoutButton = () => {
  // eslint-disable-next-line react/prop-types
  const { logoutUser } = useUser()
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const handleLogout = () => {
    logoutUser()
    const successAlert = {
      show: true,
      title: 'Cerrar sesion',
      message: 'Cerraste sesion con exito!',
      icon: 'success',
      onConfirm: () => {},
    }
    dispatch(setAlertData(successAlert))

    navigate('/')
  }
  return (
    <Button
      display={{ base: '1', md: 'inline-flex' }}
      px={{ base: '15px', md: '25px' }}
      mt="10px"
      border="2px solid black"
      backgroundColor="#ccebff"
      _hover={{
        backgroundColor: '#4db8ff',
      }}
      onClick={handleLogout}
    >
      Salir
    </Button>
  )
}

export default LogoutButton
