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
  DrawerFooter,
  useDisclosure,
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

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getItem = (isActive, text, icon) => {
    const textProperties = {}
    const iconProperties = {
      w: 6,
      h: 6,
      mr: 4,
      mt: 0.5,
      as: icon,
    }
    if (isActive) {
      textProperties.color = 'blue'
      iconProperties.color = 'blue'
    }
    return (
      <>
        <Icon iconProperties />
        <Text {...textProperties}>{text}</Text>
      </>
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
            display="flex"
            flex-direction="row"
          >
            <NavLink>
              {({ isActive }) => getItem(isActive, 'Inicio', FaHome)}
            </NavLink>
            <NavLink>
              {({ isActive }) => getItem(isActive, 'Nosostros', FaGlobeAmericas)}
            </NavLink>
            <NavLink>
              {({ isActive }) => getItem(isActive, 'Actividades', FaRegCalendarCheck)}
            </NavLink>
            <NavLink>
              {({ isActive }) => getItem(isActive, 'Testimonios', FaRegComments)}
            </NavLink>
            <NavLink>
              {({ isActive }) => getItem(isActive, 'Novedades', FaNewspaper)}
            </NavLink>
            <NavLink>
              {({ isActive }) => getItem(isActive, 'Contacto', FaPhone)}
            </NavLink>
            <NavLink>
              {({ isActive }) => getItem(isActive, 'Contribuye', FaRegMoneyBillAlt)}
            </NavLink>
          </VStack>
          <DrawerFooter flexDirection="column">
            <Button colorScheme="blue" width="100%" variant="outline" mb="8px">Log in</Button>
            <Button colorScheme="blue" width="100%">Register</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
