import { Button } from '@chakra-ui/button'
import React from 'react'
import { useNavigate } from 'react-router'
import useUser from '../hooks/useUser'

const LogoutButton = () => {
  const { logoutUser } = useUser()
  const navigate = useNavigate()
  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }
  return (
    <Button
      display={{ base: '1', md: 'inline-flex' }}
      px={{ base: '15px', md: '25px' }}
      fontWeight={400}
      bg="brand.gray1"
      onClick={handleLogout}
      _hover={{
        bg: 'brand.cyan',
      }}
    >
      Salir
    </Button>
  )
}

export default LogoutButton
