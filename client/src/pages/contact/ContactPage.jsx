/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import ContactForm from '../../features/contact/ContactForm'
import ButtonInfo from './ButtonInfo'
import './ContactPage.css'
import { getOrganizationById } from '../../services/organizationsService'

const ContactPage = () => {
  const [socials, setSocials] = useState({})

  const loadOrganizations = async (id) => {
    const loadedOrganizations = await getOrganizationById(id)
    setSocials(loadedOrganizations.data.result.publicData)
  }

  useEffect(() => {
    loadOrganizations(1)
  }, [])
  return (

    <Container padding={6} maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          border="2px solid black"
          backgroundColor="#ccebff"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap
              spacing={{
                base: 6,
                sm: 3,
                md: 5,
                lg: 6,
              }}
            >
              <WrapItem>
                <Box>
                  <Heading textAlign="center">Contacto</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }}>
                    Rellene el siguiente formulario para contactar
                  </Text>
                  <Box
                    py={{
                      base: 5,
                      sm: 5,
                      md: 8,
                      lg: 10,
                    }}
                  >
                    <VStack alignItems="center">
                      <ButtonInfo nameIcon="phone">
                        <Text color="black">{socials.phone}</Text>
                      </ButtonInfo>
                      <ButtonInfo nameIcon="email">
                        <Text color="black">{socials.address}</Text>
                      </ButtonInfo>
                      <ButtonInfo nameIcon="location">
                        <Text color="black"> Buenos Aires, Argentina</Text>
                      </ButtonInfo>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
              <ContactForm />
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  )
}
export default ContactPage
