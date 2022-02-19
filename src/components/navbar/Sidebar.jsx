/* eslint-disable no-console */
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
  Link,
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
} from 'react-icons/fa';
import useUser from '../../hooks/useUser';
import LogoutButton from '../LogoutButton';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoggedIn } = useUser()

  console.log(isLoggedIn);
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
      textProperties.color = 'blue'
      iconProperties.color = 'blue'
    }
    return (
      <Box
        display="flex"
        flex-direction="row"
      >
        <Icon {...iconProperties} />
        <Text {...textProperties}>{text}</Text>
      </Box>
    )
  }

  return (
    <>
      <Icon as={FiAlignJustify} h={8} w={8} display={{ base: 'unset', xl: 'none' }} colorScheme="teal" onClick={onOpen} cursor="pointer" />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent spacing={8} justifyContent="space-between">
          <DrawerCloseButton />
          <VStack
            spacing={8}
            fontSize="2xl"
            mt="48px"
            mx="30px"
            alignItems="flex-start"
            color="gray.600"
          >
            <Link as={NavLink} exact to="/">
              {({ isActive }) => getItem(isActive, 'Inicio', FaHome)}
            </Link>
            <Link as={NavLink} to="/nosotros">
              {({ isActive }) => getItem(isActive, 'Nosotros', FaGlobeAmericas)}
            </Link>
            <Link as={NavLink} to="/actividades">
              {({ isActive }) => getItem(isActive, 'Actividades', FaRegCalendarCheck)}
            </Link>
            <Link as={NavLink} to="/testimonios">
              {({ isActive }) => getItem(isActive, 'Testimonios', FaRegComments)}
            </Link>
            <Link as={NavLink} to="/novedades">
              {({ isActive }) => getItem(isActive, 'Novedades', FaNewspaper)}
            </Link>
            <Link as={NavLink} exact to="/contacto">
              {({ isActive }) => getItem(isActive, 'Contacto', FaPhone)}
            </Link>
            <Link as={NavLink} to="/contribuye">
              {({ isActive }) => getItem(isActive, 'Contribuye', FaRegMoneyBillAlt)}
            </Link>
            {isLoggedIn === true
              ? (<LogoutButton />)
              : (
                <>
                  <Button colorScheme="blue" width="150px" variant="outline" as={NavLink} to="/signin">Iniciar sesión</Button>
                  <Button colorScheme="blue" width="150px" as={NavLink} to="/signup">Registrarse</Button>
                </>
              )}
          </VStack>

        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
