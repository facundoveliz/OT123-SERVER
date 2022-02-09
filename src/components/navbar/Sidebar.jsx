import React from 'react';
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
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import {
  FiAlignJustify,
} from 'react-icons/fi';
import {
  FaHome,
  FaGlobeAmericas,
  FaRegCalendarCheck,
  FaRegComments,
  FaNewspaper,
  FaPhone,
  FaRegMoneyBillAlt,
} from 'react-icons/fa';

const NavItem = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  &:hover{
    color: black;
  }
`

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
            <NavItem>
              <Icon as={FaHome} w={6} h={6} mr={4} mt={0.5} />
              <Text>Inicio</Text>
            </NavItem>

            <NavItem>
              <Icon as={FaGlobeAmericas} w={6} h={6} mr={4} mt={0.5} />
              <Text>Nosotros</Text>
            </NavItem>

            <NavItem>
              <Icon as={FaRegCalendarCheck} w={6} h={6} mr={4} mt={0.5} />
              <Text>Actividades</Text>
            </NavItem>

            <NavItem>
              <Icon as={FaRegComments} w={6} h={6} mr={4} mt={0.5} />
              <Text>Testimonios</Text>
            </NavItem>

            <NavItem>
              <Icon as={FaNewspaper} w={6} h={6} mr={4} mt={0.5} />
              <Text>Novedades</Text>
            </NavItem>

            <NavItem>
              <Icon as={FaPhone} w={6} h={6} mr={4} mt={0.5} />
              <Text>Contacto</Text>
            </NavItem>

            <NavItem>
              <Icon as={FaRegMoneyBillAlt} w={6} h={6} mr={4} mt={0.5} />
              <Text>Contribuye</Text>
            </NavItem>
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
