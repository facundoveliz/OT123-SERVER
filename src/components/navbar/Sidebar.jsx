import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Text,
  Button,
  Icon,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
} from '@chakra-ui/react'
import {
  FiAlignJustify,
} from 'react-icons/fi'
import {
  FaHome,
  FaGlobeAmericas,
  FaRegCalendarCheck,
  FaRegComments,
  FaNewspaper,
  FaPhone,
  FaRegMoneyBillAlt,
  FaLockOpen,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import useUser from '../../hooks/useUser';
import LogoutButton from '../LogoutButton';
import Menu from '../menus/Menu';

const Sidebar = ({ roleId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoggedIn } = useUser()

  const getItem = (isActive, text, icon) => {
    const textProperties = {}
    const iconProperties = {
      w: 6,
      h: 9,
      mr: 4,
      mt: 0.5,
      as: icon,
    }
    if (isActive) {
      textProperties.color = '#4db8ff'
      iconProperties.color = '#4db8ff'
    }
    return (
      <Box
        display="flex"
        flex-direction="row"
        _hover={{ color: '#3db8ff' }}
      >
        <Icon {...iconProperties} />
        <Text {...textProperties}>{text}</Text>
      </Box>
    )
  }

  return (
    <>
      <Icon as={FiAlignJustify} h={8} w={8} display={{ base: 'unset', xl: 'none' }} colorScheme="teal" onClick={onOpen} cursor="pointer" />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} zIndex="10000">
        <DrawerOverlay />
        <DrawerContent spacing={8} justifyContent="space-between" borderRight="2px solid black">
          <DrawerCloseButton />
          <VStack
            spacing={8}
            fontSize="2xl"
            mt="48px"
            mx="30px"
            alignItems="flex-start"
            color="gray.600"
          >
            <NavLink exact to="/">
              {({ isActive }) => getItem(isActive, 'Inicio', FaHome)}
            </NavLink>
            <NavLink to="/nosotros">
              {({ isActive }) => getItem(isActive, 'Nosotros', FaGlobeAmericas)}
            </NavLink>
            <NavLink to="/actividades">
              {({ isActive }) => getItem(isActive, 'Actividades', FaRegCalendarCheck)}
            </NavLink>
            <NavLink to="/testimonios">
              {({ isActive }) => getItem(isActive, 'Testimonios', FaRegComments)}
            </NavLink>
            <NavLink to="/novedades">
              {({ isActive }) => getItem(isActive, 'Novedades', FaNewspaper)}
            </NavLink>
            <NavLink exact to="/contacto">
              {({ isActive }) => getItem(isActive, 'Contacto', FaPhone)}
            </NavLink>
            <NavLink to="/contribuye">
              {({ isActive }) => getItem(isActive, 'Contribuye', FaRegMoneyBillAlt)}
            </NavLink>
            <NavLink to="/backoffice">
              {({ isActive }) => getItem(isActive, 'Backoffice', FaLockOpen)}
            </NavLink>
            <Box display="flex" flexDirection="column" width="100%">
              {isLoggedIn === true
          && <Menu roleId={roleId} />}
              {isLoggedIn === true
                ? (<LogoutButton />)
                : (
                  <>
                    <Button
                      backgroundColor="#ccebff"
                      _hover={{ backgroundColor: '#4db8ff' }}
                      border="2px solid black"
                      width="100%"
                      as={NavLink}
                      to="/signin"
                      mb="15px"
                    >
                      Iniciar sesión
                    </Button>
                    <Button
                      backgroundColor="#d6f5d6"
                      _hover={{ backgroundColor: '#6fdc6f' }}
                      border="2px solid black"
                      width="100%"
                      as={NavLink}
                      to="/signup"
                    >
                      Registrarse
                    </Button>
                  </>
                )}
            </Box>
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
}
Sidebar.propTypes = {
  roleId: PropTypes.number.isRequired,
}
export default Sidebar;
