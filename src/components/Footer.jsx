import React from 'react';
import {
  Box, Image, Flex, Stack, VStack, HStack, Divider, Center, Icon,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import styled from '@emotion/styled'

const Text = styled.p`
  cursor: pointer;
  text-align: center;
  font-size: 19px;
  white-space: nowrap;
`

const Footer = () => (
  <Box position="relative" mt="20px">
    <Divider borderColor="black" borderWidth="1px" />
    <Flex
      py={4}
      direction={{ base: 'column', sm: 'row' }}
      justify="space-around"
      align="center"
    >
      <Stack spacing={4} w="100%" justify="space-between" px={12} direction={{ base: 'column', lg: 'row' }}>
        <Text>Noticias</Text>
        <Text>Actividades</Text>
        <Text>Novedades</Text>
      </Stack>
      <Image src="../../logo.png" alt="logo" p={8} px={{ base: 24, sm: 0 }} />
      <Stack spacing={4} w="100%" justify="space-between" px={12} direction={{ base: 'column', lg: 'row' }}>
        <Text>Testimonios</Text>
        <Text>Nosotros</Text>
        <Text>Contacto</Text>
      </Stack>
    </Flex>
    <Center>
      <Divider borderColor="black" borderWidth="1px" mt={4} width="91.5%" justify="center" />
    </Center>
    <VStack py={24} spacing={8}>
      <HStack
        direction="row"
        justify="center"
        align="center"
        spacing={8}
      >
        <Icon cursor="pointer" as={FaFacebook} w={8} h={8} />
        <Icon cursor="pointer" as={FaInstagram} w={8} h={8} />
        <Icon cursor="pointer" as={FaTwitter} w={8} h={8} />
      </HStack>
      <Text textAlign="center">2022 by Alkemy. All Rights Reserved</Text>
    </VStack>
  </Box>
);

export default Footer;
