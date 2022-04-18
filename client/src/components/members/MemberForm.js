import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Heading,
  HStack,
  VStack,
  Button,
  FormLabel,
  Input,
  Spacer,
  FormControl,
  Image,
  Box,
} from '@chakra-ui/react'

import { createMembers, getMember, updateMember } from '../../services/membersService'
import Alert from '../alert/Alert'

const MemberForm = () => {
  const { id } = useParams()
  const [memberData, setMemberData] = useState({
    id: null,
    name: '',
    image:
      'https://imageio.forbes.com/specials-images/imageserve/61688aa1d4a8658c3f4d8640/Antonio-Juliano/0x0.jpg?fit=bounds&format=jpg&width=960',
  })
  const [ready, setReady] = useState(false)
  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })
  const loadMemberData = async () => {
    if (id) {
      try {
        const loadedMemberData = await getMember(id)
        setMemberData({
          id: loadedMemberData.data.result.id,
          name: loadedMemberData.data.result.name,
          image:
            'https://imageio.forbes.com/specials-images/imageserve/61688aa1d4a8658c3f4d8640/Antonio-Juliano/0x0.jpg?fit=bounds&format=jpg&width=960',
        })
        setReady(true)
      } catch (error) {
        const errorAlert = {
          show: true,
          title: 'Ooops, algo ha fallado!',
          message: error.message,
          icon: 'error',
          onConfirm: () => {},
        }
        setAlerts(errorAlert)
      }
    }
  }
  useEffect(() => {
    loadMemberData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateChangeHandler = async (values) => {
    const updatedMember = await updateMember(id, {
      name: values.name,
      image: memberData.image,
    })
    if (updatedMember) {
      const successAlert = {
        show: true,
        title: 'Miembro',
        message: 'La persona se ha actualizado!',
        icon: 'success',
        onConfirm: () => {},
      }
      setAlerts(successAlert)
    }
  }

  const AddSubmitHandler = async (values) => {
    try {
      const newMember = await createMembers({
        name: values.name,
        image: values.image,
      })
      if (newMember) {
        const successAlert = {
          show: true,
          title: 'Miembro',
          message: 'Miembro agregado!',
          icon: 'success',
          onConfirm: () => {},
        }
        setAlerts(successAlert)
      }
    } catch (error) {
      const errorAlert = {
        show: true,
        title: 'hubo un error!',
        message: error.message,
        icon: 'error',
        onConfirm: () => {},
      }
      setAlerts(errorAlert)
    }
  }

  return (
    <>
      <Alert {...alerts} />
      {((id && ready) || !id) && (
        <Formik
          initialValues={memberData}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Nombre requerido!')
              .min(3, 'Nombre muy corto!'),
          })}
          onSubmit={(values) =>
            (id ? updateChangeHandler(values) : AddSubmitHandler(values))}
        >
          {({ values, handleSubmit, handleChange }) => (
            <HStack
              display="flex"
              height="100vh"
              backgroundColor="#FAFA88"
              width="100%"
            >
              <VStack
                as="form"
                m="auto"
                p="2"
                w={{ base: '90%', md: 400, sm: 300 }}
                h="auto"
                justifyContent="center"
                borderWidth="1px solid white"
                borderRadius="lg"
                boxShadow="lg"
                backgroundColor="white"
                display="block"
                onSubmit={handleSubmit}
              >
                <Heading align="center">Nosotros</Heading>
                <FormControl>
                  <FormLabel paddingLeft="2">Nombre</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <Spacer />
                <FormLabel paddingLeft="2">Imagen</FormLabel>
                <FormControl
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  <Box paddingBottom="2" align="center">
                    <Input
                      width="230px"
                      border-radius="5px"
                      padding="4px 5px"
                      cursor="pointer"
                      type="file"
                    />
                  </Box>
                  <Box paddingLeft="4" paddingRight="4">
                    <Image objectFit="cover" src={memberData.image} />
                  </Box>
                </FormControl>
                <Button type="submit" w="100%">
                  Guardar
                </Button>
              </VStack>
            </HStack>
          )}
        </Formik>
      )}
    </>
  )
}

export default MemberForm
