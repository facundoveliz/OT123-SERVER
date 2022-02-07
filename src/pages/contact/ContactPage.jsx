import React from 'react'
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import ContactForm from '../../features/contact/ContactForm'
import ButtonInfo from './ButtonInfo'
import IconInfo from './IconInfo'
import './ContactPage.css'

const ContactPage = () => (
  <Container maxW="full" mt={0} centerContent overflow="hidden">
    <Flex>
      <Box
        bg="brand.lightBlue"
        color="white"
        borderRadius="lg"
        m={{ sm: 4, md: 16, lg: 10 }}
        p={{ sm: 5, md: 5, lg: 16 }}
      >
        <Box p={4}>
          <Wrap
            spacing={{
              base: 20,
              sm: 3,
              md: 5,
              lg: 20,
            }}
          >
            <WrapItem>
              <Box>
                <Heading textAlign="center">Contacto</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
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
                  <VStack pl={0} spacing={3} alignItems="center">
                    <ButtonInfo nameIcon="phone">
                      <Text color="white"> +54-1160112988</Text>
                    </ButtonInfo>
                    <ButtonInfo nameIcon="email">
                      <Text color="white"> somosfundacionmas@gmail.com</Text>
                    </ButtonInfo>
                    <ButtonInfo nameIcon="location">
                      <Text color="white"> Buenos Aires, Argentina</Text>
                    </ButtonInfo>
                  </VStack>
                </Box>

                <HStack style={{ display: 'flex', justifyContent: 'center' }}>
                  <a href="http://www.facebook.com/somos_mas" target="_blank">
                    <IconInfo nameIcon="facebook" />
                  </a>
                  <a href="http://www.instagram.com/SomosMas" target="_blank">
                    <IconInfo nameIcon="instagram" />
                  </a>
                </HStack>
              </Box>
            </WrapItem>

            <ContactForm />
          </Wrap>
        </Box>
      </Box>
    </Flex>
  </Container>
)
export default ContactPage
