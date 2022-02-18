import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  HStack, Image, Text, Button,
} from '@chakra-ui/react'
import Sidebar from './Sidebar'
import useUser from '../../hooks/useUser'

const Header = () => {
  const { userData } = useUser()
  const getText = (isActive, text) => {
    const textProperties = {}
    if (isActive) {
      textProperties.color = 'red'
    }
    return (
      <Text cursor="pointer" {...textProperties}>{text}</Text>
    )
  }

  const navItems = [
    <NavLink exact to="/">
      {({ isActive }) => getText(isActive, 'Inicio')}
    </NavLink>,
    <NavLink to="/nosotros">
      {({ isActive }) => getText(isActive, 'Nosotros')}
    </NavLink>,
    <NavLink to="/actividades">
      {({ isActive }) => getText(isActive, 'Actividades')}
    </NavLink>,
    <NavLink to="/testimonios">
      {({ isActive }) => getText(isActive, 'Testimonios')}
    </NavLink>,
    <NavLink to="/novedades">
      {({ isActive }) => getText(isActive, 'Novedades')}
    </NavLink>,
    <NavLink exact to="/contacto">
      {({ isActive }) => getText(isActive, 'Contacto')}
    </NavLink>,
    <NavLink to="/contribuye">
      {({ isActive }) => getText(isActive, 'Contribuye')}
    </NavLink>,
  ]
  return (
    <HStack justify="space-between" py={2} px={3}>
      <Sidebar />
      <Image
        src="../../logo.png"
        alt="logo"
        h={{ base: '54.6px', xl: '78px' }}
        w={{ base: '140px', xl: '200px' }}
        cursor="pointer"
      />
      <HStack
        spacing={8}
        lineHeight="30px"
        justify="center"
        display={{ base: 'none', xl: 'flex' }}
        wrap="wrap"
        fontSize="lg"
      >
        {navItems}
      </HStack>
      <HStack spacing={4} display={{ base: 'none', xl: 'unset' }}>
        {
        !userData.payload.userData
          ? (
            <>
              <NavLink to="/signin">
                <Button colorScheme="blue" width="150px" variant="outline">
                  Iniciar sesión

                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button colorScheme="blue" width="150px">
                  Registrarse
                </Button>
              </NavLink>
            </>
          ) : (
            <Button colorScheme="blue" width="150px">
              Salir
            </Button>

          )
}
      </HStack>
    </HStack>
  )
}

export default Header
