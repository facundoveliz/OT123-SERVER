import React from 'react';
import {
  Box, Text, Image, Flex, Stack, VStack, HStack, Divider, Center, Icon,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => (
  <Box>
    <Divider borderColor="#000" borderWidth="1px" />
    <Flex
      py={4}
      direction={{ base: 'column', sm: 'row' }}
      justify="space-around"
      align="center"
    >
      <Stack spacing={4} w="100%" justify="space-between" px={12} direction={{ base: 'column', lg: 'row' }}>
        <Text cursor="pointer" textAlign="center" fontSize="lg" whiteSpace="nowrap">Noticias</Text>
        <Text cursor="pointer" textAlign="center" fontSize="lg" whiteSpace="nowrap">Actividades</Text>
        <Text cursor="pointer" textAlign="center" fontSize="lg" whiteSpace="nowrap">Novedades</Text>
      </Stack>
      <Image src="../../logo.png" alt="logo" p={8} px={{ base: 24, sm: 0 }} />
      <Stack spacing={4} w="100%" justify="space-between" px={12} direction={{ base: 'column', lg: 'row' }}>
        <Text cursor="pointer" textAlign="center" fontSize="lg" whiteSpace="nowrap">Testimonios</Text>
        <Text cursor="pointer" textAlign="center" fontSize="lg" whiteSpace="nowrap">Nosotros</Text>
        <Text cursor="pointer" textAlign="center" fontSize="lg" whiteSpace="nowrap">Contacto</Text>
      </Stack>
    </Flex>
    <Center>
      <Divider borderColor="#000" borderWidth="1px" mt={4} width="91.5%" justify="center" />
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
