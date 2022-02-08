import React from 'react';
import {
  Button,
  Icon,
  HStack,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  useDisclosure,
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import { FiAlignJustify, FiHome } from 'react-icons/fi';

const Text = styled.p`
  color: gray.700;
  cursor: pointer;
  &:hover {
    color: black;
  }
`

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
        <DrawerContent spacing={8} justifyContent="space-between">
          <DrawerCloseButton />

          <VStack
            spacing={8}
            fontSize="2xl"
            mt="48px"
            mx="30px"
            alignItems="flex-start"
          >
            <HStack>
              <Icon as={FiHome} />
              <Text>Inicio</Text>
            </HStack>

            <HStack>
              <Text>Nosotros</Text>
            </HStack>
            <HStack>
              <Text>Actividades</Text>
            </HStack>
            <HStack>
              <Text>Testimonios</Text>
            </HStack>
            <HStack>
              <Text>Novedades</Text>
            </HStack>
            <HStack>
              <Text>Contacto</Text>
            </HStack>
            <HStack>
              <Text>Contribuye</Text>
            </HStack>
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
