import React, { useEffect, useState } from 'react';

import {
  Box, Image, Flex, Stack, VStack, HStack, Icon,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';
import { getOrganizationById } from '../services/organizationsService'

const Text = styled.p`
  cursor: pointer;
  text-align: center;
  font-size: 19px;
  white-space: nowrap;
`

const Footer = () => {
  const [socials, setSocials] = useState({})

  const loadOrganizations = async (id) => {
    const loadedOrganizations = await getOrganizationById(id)
    setSocials(loadedOrganizations.data.result.publicData)
  }

  useEffect(() => {
    loadOrganizations(1)
  }, [])

  return (
    <Box position="relative" backgroundColor="#f2f2f2" borderTop="2px solid black">
      <Flex
        py={4}
        direction={{ base: 'column', sm: 'row' }}
        justify="space-around"
        align="center"
      >
        <Stack spacing={2} w="100%" justify="space-between" px={12} direction={{ base: 'column', lg: 'row' }}>
          <Link to="/home">Home</Link>
          <Link to="/actividades">Actividades</Link>
          <Link to="/novedades">Novedades</Link>
        </Stack>
        <Image src="../../logo.png" alt="logo" p={4} px={{ base: 24, sm: 0 }} />
        <Stack spacing={2} w="100%" justify="space-between" px={12} direction={{ base: 'column', lg: 'row' }}>
          <Link to="/testimonios">Testimonios</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
        </Stack>
      </Flex>
      <VStack py={6} spacing={4} w="80%" m="auto" borderTop="2px solid black">
        <HStack
          direction="row"
          justify="center"
          align="center"
          spacing={4}
        >
          <a target="_blank" rel="noreferrer" href={socials.instagram}>
            <Icon cursor="pointer" as={FaInstagram} w={8} h={8} />
          </a>
          <a target="_blank" rel="noreferrer" href={socials.facebook}>
            <Icon cursor="pointer" as={FaFacebook} w={8} h={8} />
          </a>
          <a target="_blank" rel="noreferrer" href={socials.linkedin}>
            <Icon cursor="pointer" as={FaLinkedin} w={8} h={8} />
          </a>
        </HStack>
        <Text textAlign="center">2022 by Alkemy. All Rights Reserved</Text>
      </VStack>
    </Box>
  )
}

export default Footer;
