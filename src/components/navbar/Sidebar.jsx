import React from 'react';
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Icon,
} from '@chakra-ui/react';
import { FiAlignJustify } from 'react-icons/fi';
import NavItem from './NavItem';

// eslint-disable-next-line react/prop-types
const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Icon as={FiAlignJustify} h={8} w={8} display={{ base: 'unset', xl: 'none' }} colorScheme="teal" onClick={onOpen} cursor="pointer" />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent spacing={8} flexDirection="column">
          <DrawerCloseButton />
          <NavItem text="Inicio" />
          <NavItem text="Nosotros" />
          <NavItem text="Actividades" />
          <NavItem text="Novedades" />
          <NavItem text="Testimonios" />
          <NavItem text="Contacto" />
          <NavItem text="Contribuye" />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
