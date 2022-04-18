import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  HStack, Image, Text, Button,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import useUser from '../../hooks/useUser'
import { getUserData } from '../../app/slices/auth'
import Sidebar from './Sidebar'
import Menu from '../menus/Menu'

const Header = () => {
  const userData = useSelector(getUserData)
  const { isLoggedIn } = useUser()
  let id = 0
  let roleId = 0

  if (isLoggedIn) {
    id = userData.payload.persistedReducer.userData.dataValues.id
    roleId = userData.payload.persistedReducer.userData.dataValues.roleId
  }

  const getText = (isActive, text) => {
    const textProperties = {}
    if (isActive) {
      textProperties.color = '#4db8ff'
      textProperties.textDecoration = 'underline #4db8ff'
      textProperties.textDecorationThickness = '3px'
    }
    return (
      <Text {...textProperties} _hover={{ color: '#4db8ff', transition: 'all 0.3s ease' }}>{text}</Text>
    )
  }

  const navItems = [
    <NavLink key="home" to="/home">
      {({ isActive }) => getText(isActive, 'Inicio')}
    </NavLink>,
    <NavLink key="nosotros" to="/nosotros">
      {({ isActive }) => getText(isActive, 'Nosotros')}
    </NavLink>,
    <NavLink key="actividades" to="/actividades">
      {({ isActive }) => getText(isActive, 'Actividades')}
    </NavLink>,
    <NavLink key="testimonios" to="/testimonios">
      {({ isActive }) => getText(isActive, 'Testimonios')}
    </NavLink>,
    <NavLink key="novedades" to="/novedades">
      {({ isActive }) => getText(isActive, 'Novedades')}
    </NavLink>,
    <NavLink key="contacto" to="/contacto">
      {({ isActive }) => getText(isActive, 'Contacto')}
    </NavLink>,
    <NavLink key="contribuye" to="/contribuye">
      {({ isActive }) => getText(isActive, 'Contribuye')}
    </NavLink>,

  ]

  return (
    <HStack position="fixed" w="100%" h="100px" zIndex="1000" top="0" justify="space-between" py={4} px={3} fontSize="18px" backgroundColor="#f2f2f2" borderBottom="2px solid black">
      <Sidebar roleId={roleId} />
      <NavLink to="/home">
        <Image
          src="../../logo.png"
          alt="logo"
          h={{ base: '54.6px', xl: '78px' }}
          w={{ base: '140px', xl: '200px' }}
          cursor="pointer"
        />
      </NavLink>
      <HStack
        spacing={5}
        lineHeight="30px"
        justify="center"
        display={{ base: 'none', xl: 'flex' }}
        wrap="wrap"
        alignItems="center"
      >
        {navItems}
      </HStack>
      <HStack
        paddingRight={5}
        spacing={2}
        display={{ base: 'none', xl: 'unset' }}
        justify-content="center"
      >
        {isLoggedIn === true
          && <Menu id={id} roleId={roleId} />}
        {isLoggedIn === false
          && (
          <Button
            color="#2DCC0A"
            width="150px"
            as={NavLink}
            to="/signin"
          >
            Iniciar sesión
          </Button>
          )}
        {isLoggedIn === false
          && (
          <Button
            backgroundColor="#d6f5d6"
            _hover={{ backgroundColor: '#6fdc6f' }}
            border="2px solid black"
            width="150px"
            as={NavLink}
            to="/signup"
          >
            Registrarse
          </Button>
          )}
      </HStack>
    </HStack>
  )
}

export default Header
