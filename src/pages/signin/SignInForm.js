import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Heading, VStack, Button, HStack, Icon, Box,
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import TextField from '../../components/textfield/TextField'
import Alert from '../../components/alert/Alert'

const SignInForm = () => {
  const navigate = useNavigate()
  const { loginUser } = useUser()

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
    title: '¡Inicio de sesión exitoso!',
    message: 'Bienvenido.',
    icon: 'success',
    onConfirm: () => {},
  }

  const errorAlert = {
    show: true,
    title: '¡Inicio de sesión fallido!',
    message: 'Usuario o contraseña incorrectos.',
    icon: 'error',
    onConfirm: () => {},
  }

  const handleSubmit = (userEmailPwd) => {
    const loginSuccess = loginUser(userEmailPwd)
    loginSuccess.then((success) => {
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
          email: '', password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('¡E-mail inválido!').required('¡E-mail requerido!'),
          password: Yup.string().required('¡Contraseña requerida!'),
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
              <Heading textAlign="center">
                Entrar
              </Heading>
              <TextField backgroundColor="white" name="email" placeholder="E-mail" type="email" />
              <TextField backgroundColor="white" name="password" placeholder="Contraseña" type="password" />
              <Button
                type="submit"
                w="100%"
                border="2px solid black"
                backgroundColor="#d6f5d6"
                _hover={{
                  backgroundColor: '#6fdc6f',
                }}
              >
                Iniciar sesión
              </Button>
            </VStack>
          </HStack>
        )}
      </Formik>
    </>
  )
}

export default SignInForm
