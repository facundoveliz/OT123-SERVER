import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Heading, HStack, VStack, Button, Box, Icon, Text,
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom'
import TextField from '../../components/textfield/TextField'
import Alert from '../../components/alert/Alert'
import useUser from '../../hooks/useUser'

const SignUpForm = () => {
  const navigate = useNavigate()
  const { registerUser } = useUser()

  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    buttons: false,
    onConfirm: () => {},
  })

  const successAlert = {
    show: true,
    title: '¡Registro exitoso!',
    message: '¡Gracias por unirte a SOMOS MÁS!',
    icon: 'success',
    buttons: false,
    onConfirm: () => {},
  }

  const errorAlert = {
    show: true,
    title: '¡Registro fallido!',
    message: 'No se ha podido completar el registro.',
    icon: 'error',
    buttons: false,
    onConfirm: () => {},
  }

  const handleSubmit = (userData) => {
    const registerSuccess = registerUser(userData)
    registerSuccess.then((success) => {
      if (success === true) {
        setAlerts(successAlert)
        navigate('/')
      } else {
        setAlerts(errorAlert)
      }
    })
  }

  return (
    <>
      <Alert {...alerts} />
      <Formik
        initialValues={{
          firstName: '', lastName: '', email: '', password: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('¡Nombre requerido!').min(3, '¡Nombre muy corto!'),
          lastName: Yup.string().required('¡Apellido requerido!').min(3, '¡Apellido muy corto!'),
          email: Yup.string().email('¡E-mail inválido!').required('¡E-mail requerido!'),
          password: Yup.string().required('¡Contraseña requerida!').min(6, '¡Contraseña muy corta!'),
        })}
        onSubmit={(values, actions) => {
          handleSubmit(values)
          actions.resetForm()
        }}
      >
        {(formik) => (
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
              borderWidth="1px solid white"
              border="2px solid black"
              backgroundColor="#ffffcc"
              onSubmit={formik.handleSubmit}
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
              <Heading as="h3" size="lg" align="center">Registro</Heading>
              <TextField backgroundColor="white" name="firstName" placeholder="Nombre" my="1" />
              <TextField backgroundColor="white" name="lastName" placeholder="Apellido" my="1" />
              <TextField backgroundColor="white" name="email" placeholder="E-mail" type="email" my="1" />
              <TextField backgroundColor="white" name="password" placeholder="Contraseña" type="password" my="1" />
              <Button
                border="2px solid black"
                backgroundColor="#d6f5d6"
                _hover={{
                  backgroundColor: '#6fdc6f',
                }}
                type="submit"
                w="100%"
              >
                Crear cuenta
              </Button>
              <Text py={3}>
                ¿Tienes una cuenta?
                {' '}
                <Link style={{ fontWeight: 'bold' }} to="/signin">Entrar</Link>
              </Text>

            </VStack>

          </HStack>
        )}
      </Formik>
    </>
  )
}

export default SignUpForm
