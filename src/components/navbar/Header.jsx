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
  let roleId = 0
  const { isLoggedIn } = useUser()

  if (isLoggedIn) {
    roleId = userData.payload.userData.dataValues
  }

  const getText = (isActive, text) => {
    const textProperties = {}
    if (isActive) {
      textProperties.color = 'red'
    }
    return (
      <Text {...textProperties}>{text}</Text>
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
        {isLoggedIn === true
          && <Menu roleId={roleId} />}
        {isLoggedIn === false
          && <Button colorScheme="blue" width="150px" variant="outline" as={NavLink} to="/signin">Sign in</Button>}
        {isLoggedIn === false
          && <Button colorScheme="blue" width="150px" as={NavLink} to="/signup">Sign up</Button>}
      </HStack>
    </HStack>
  )
}

export default Header
