import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Heading,
  HStack,
  VStack,
  Button,
  FormLabel,
  Spacer,
  FormControl,
  Textarea,
  Icon,
  Box,
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi';
import Alert from '../alert/Alert'
import { getOrganizationById, updateOrganization } from '../../services/organizationsService'

const EditWelcomeText = () => {
  let { id } = useParams()
  id = 1
  const navigate = useNavigate()
  const [activity, setActivity] = useState({
    welcomeText: '',
  })
  const [ready, setReady] = useState(false)
  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })
  const loadactivity = async () => {
    if (id) {
      try {
        const loadedactivity = await getOrganizationById(id)
        setActivity({
          welcomeText: loadedactivity.data.result.publicData.welcomeText,
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
    loadactivity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateChangeHandler = async (e, values) => {
    const updatedActivity = await updateOrganization(values)
    if (updatedActivity) {
      const successAlert = {
        show: true,
        title: 'Actividad',
        message: 'La actividad se ha actualizado!',
        icon: 'success',
        onConfirm: () => {},
      }
      setAlerts(successAlert)
      navigate('/')
    }
  }

  return (
    <>
      <Alert {...alerts} />
      {((id && ready) || !id) && (
        <Formik
          initialValues={activity}
          validationSchema={Yup.object({
            welcomeText: Yup.string()
              .required('Nombre requerido!')
              .min(20, 'Nombre muy corto!'),
            content: Yup.string().min(1).max(150).required(),
          })}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
          }) => (
            <HStack
              display="flex"
              justifyContent="center"
              backgroundColor="#f2f2f2"
            >
              <VStack
                as="form"
                h="auto"
                w={{ base: '90%', md: '40%' }}
                m="40px"
                p="25px"
                borderRadius="lg"
                boxShadow="lg"
                border="2px solid black"
                backgroundColor="#ffffcc"
                onSubmit={(e) => updateChangeHandler(e, values)}
              >
                <Box width="100%">
                  <Icon
                    alignitems="left"
                    as={FiArrowLeft}
                    w={8}
                    h={8}
                    mb={4}
                    border="2px solid black"
                    borderRadius="lg"
                    boxShadow="lg"
                    backgroundColor="#ccebff"
                    _hover={{
                      backgroundColor: '#4db8ff',
                      transition: 'all 0.3s ease',
                    }}
                    cursor="pointer"
                    onClick={() => {
                      navigate(-1)
                    }}
                  />
                </Box>
                <Heading align="center">Home</Heading>
                <FormControl>
                  <FormLabel paddingLeft="2">Edita el texto de bienvenida</FormLabel>
                  <Textarea
                    backgroundColor="white"
                    type="text"
                    id="welcomeText"
                    name="welcomeText"
                    onBlur={handleBlur}
                    value={values.welcomeText}
                    onChange={handleChange}
                  />
                  <small>{errors.welcomeText && touched.welcomeText && errors.welcomeText}</small>
                </FormControl>
                <Spacer />

                <Button
                  border="2px solid black"
                  backgroundColor="#d6f5d6"
                  _hover={{
                    backgroundColor: '#6fdc6f',
                  }}
                  type="submit"
                  w="100%"
                >
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

export default EditWelcomeText
