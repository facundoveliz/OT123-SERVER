/* disable error for empty href, when the
routes are completed we will change that */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  HStack, Image, Link, Button,
} from '@chakra-ui/react'
import Sidebar from './Sidebar';

const Header = () => (
  <HStack justify="space-between" py={2} px={3}>
    <Sidebar />
    <Image src="../../logo.png" alt="logo" h={{ base: '54.6px', xl: '78px' }} w={{ base: '140px', xl: '200px' }} cursor="pointer" />
    <HStack spacing={8} lineHeight="30px" justify="center" display={{ base: 'none', xl: 'unset' }} wrap="wrap" fontSize="lg">
      <Link href="#">Inicio</Link>
      <Link href="#">Nosotros</Link>
      <Link href="#">Actividades</Link>
      <Link href="#">Novedades</Link>
      <Link href="#">Testimonios</Link>
      <Link href="#">Contacto</Link>
      <Link href="#">Contribuye</Link>
    </HStack>
    <HStack spacing={4} display={{ base: 'none', xl: 'unset' }}>
      <Button colorScheme="blue" width="150px" variant="outline">Log in</Button>
      <Button colorScheme="blue" width="150px">Register</Button>
    </HStack>
  </HStack>
)

export default Header;
