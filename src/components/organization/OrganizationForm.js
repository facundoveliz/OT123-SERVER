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
// eslint-disable-next-line import/no-unresolved
import { getOrganizationById, updateOrganization } from '../../services/organizationsService'
import Alert from '../alert/Alert'

const OrganizationForm = () => {
  const { id } = useParams()
  const [orgData, setOrgData] = useState({
    id: null,
    name: '',
    image:
    'https://nypost.com/wp-content/uploads/sites/2/2021/12/nature_14.jpg?quality=80&strip=all&w=744',
  })
  const [ready, setReady] = useState(false)
  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })
  const loadOrgData = async () => {
    if (id) {
      try {
        const loadedOrgData = await getOrganizationById(id)
        setOrgData({
          id: loadedOrgData.data.result.id,
          name: loadedOrgData.data.result.name,
          image: 'https://nypost.com/wp-content/uploads/sites/2/2021/12/nature_14.jpg?quality=80&strip=all&w=744',
        })
        setReady(true)
      } catch (error) {
        const errorAlert = {
          show: true,
          title: 'Hubo un error!',
          message: error.message,
          icon: 'error',
          onConfirm: () => {},
        }
        setAlerts(errorAlert)
      }
    }
  }
  useEffect(() => {
    loadOrgData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateChangeHandler = async (values) => {
    const updatedOrg = await updateOrganization(id, {
      name: values.name,
      image: orgData.image,
    })
    // eslint-disable-next-line no-console
    console.log(updatedOrg)
    if (updatedOrg) {
      const successAlert = {
        show: true,
        title: 'Organismo',
        message: 'El organismo se ha actualizado!',
        icon: 'success',
        onConfirm: () => {},
      }
      setAlerts(successAlert)
    }
  }

  return (
    <>
      <Alert {...alerts} />
      {((id && ready) || !id) && (
        <Formik
          initialValues={orgData}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Nombre requerido!')
              .min(3, 'Nombre muy corto!'),
          })}
          onSubmit={(values, { resetForm }) => {
            updateChangeHandler(values)
            resetForm()
          }}
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
                <Heading align="center">Organizacion</Heading>
                <FormControl display="flex" justifyContent="space-between">
                  <FormLabel paddingLeft="2">Nombre</FormLabel>
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <Spacer />
                <FormLabel paddingLeft="2">Logo</FormLabel>
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
                    <Image objectFit="cover" src={orgData.image} />
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

export default OrganizationForm
