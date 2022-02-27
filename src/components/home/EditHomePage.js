/* eslint-disable import/named */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Text,
  Table,
  Tr,
  Td,
  Tbody,
  Thead,
} from '@chakra-ui/react'
import { getAllSliders } from '../../services/slidersService'
import { getOrganizationById } from '../../services/organizationsService'

import ItemCollapse from './ItemCollapse'
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
    <Box display="flex" height="100%" width="100%" backgroundColor="#f2f2f2" justifyContent="center">
      <Box
        border="2px solid black"
        backgroundColor="#ffffcc"
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        w={{ base: '98%', md: '90%' }}
        m={{ base: '10px', md: '50px' }}
        p="2"
        overflow="auto"
      >
        <Text paddingLeft="2" fontSize="2xl" mb="30px">
          Edit Home
        </Text>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table size="sm" textAlign="center">
            <Thead bg="brand.cyan">
              <Tr fontWeight="black">
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
                    backgroundColor="#ccebff"
                    border="2px solid black"
                    _hover={{
                      backgroundColor: '#4db8ff',
                    }}
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
              {slides
            && slides.map((slide) => (
              <ItemCollapse
                slide={slide}
              />
            ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  )
}
