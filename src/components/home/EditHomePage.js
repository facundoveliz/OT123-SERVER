/* eslint-disable no-console */
/* eslint-disable import/named */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Image,
  Text,
  Table,
  Tr,
  Td,
  Tbody,
  Thead,
} from '@chakra-ui/react'

import { getAllSliders } from '../../services/slidersService'
import { getOrganizationById } from '../../services/organizationsService'

import Alert from '../alert/Alert'
import Spinner from '../Spinner'

export default function EditHomePage() {
  const orgId = '1'
  const navigate = useNavigate()
  const [isLoading, setIsloading] = useState(false)
  const [welcomeText, setWelcomeText] = useState('Bienvenido')
  const [slides, setSlides] = useState([])

  const alertProps = {
    show: false,
    title: 'Ooops, algo ha fallado!',
    message: '',
    icon: 'error',
    onConfirm: () => {},
  }

  useEffect(() => {
    setIsloading(true)
    Promise.all([getAllSliders(), getOrganizationById(orgId)])
      .then(([slideData, orgData]) => {
        setIsloading(false)
        const allSlides = slideData.data.result.sliders
        setSlides(allSlides)
        const org = orgData.data.result.publicData
        setWelcomeText(org.welcomeText)
      })
      .catch((error) => {
        setIsloading(false)
        Alert({
          ...alertProps,
          show: true,
          message: error,
        })
      })
      // eslint-disable-next-line
    }, [])

  function createMarkup() {
    return { __html: `${welcomeText}` };
  }

  return (
    <Box
      mt="30px"
      d="flex"
      justifyContent="center"
      alignItems="center"
      p="5px"
      flexDirection="column"
      textAlign="center"
    >
      <Text fontSize="2xl" mb="30px">
        Edit Home
      </Text>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table size="sm" textAlign="center">
          <Thead bg="brand.cyan">
            <Tr>
              <Td textAlign="center">Nombre</Td>
              <Td textAlign="center">Texto de bienvenida</Td>
              <Td textAlign="center">Imagen</Td>
              <Td textAlign="center">Acciones</Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign="center">Welcome Text</Td>
              <Td textAlign="center"><Box dangerouslySetInnerHTML={createMarkup()} /></Td>
              <Td />
              <Td textAlign="center">
                <Button
                  onClick={() => navigate('editwelcometext')}
                  fontWeight={600}
                  bg="brand.cyan"
                  _hover={{
                    bg: 'brand.gray1',
                  }}
                >
                  Editar
                </Button>
              </Td>
            </Tr>
            {slides
            && slides.map((slide) => (
              <Tr
                key={slide.id}
                justifyContent="space-between"
                flexDir={{ base: 'column', md: 'row' }}
              >
                <Td>{`Slide ${slide.id}`}</Td>
                <Td flexGrow="1">{slide.text}</Td>
                <Td textAlign="center">
                  <Image maxW="300px" src={slide.imageUrl} />
                </Td>
                <Td textAlign="center">
                  <Button
                    onClick={() => navigate(`slide/${slide.id}`)}
                    fontWeight={600}
                    bg="brand.cyan"
                    _hover={{
                      bg: 'brand.gray1',
                    }}
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}
