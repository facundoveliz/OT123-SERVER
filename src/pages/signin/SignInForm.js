import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Image, Heading, HStack, VStack, Button,
} from '@chakra-ui/react';
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
          <Box height="100vh" backgroundColor="#FAFA88">
            <HStack display="flex" backgroundColor="#FAFA88" justifyContent="center">
              <Image boxSize="100x" src="https://i.imgur.com/7ppUaV9.png" alt="Logo de SOMOS MÁS." align="center" />
            </HStack>
            <HStack display="flex" backgroundColor="#FAFA88">
              <VStack
                as="form"
                m="auto"
                p="4"
                w={{ base: '90%', md: 500 }}
                h="auto"
                justifyContent="center"
                borderWidth="1px solid white"
                borderRadius="lg"
                boxShadow="lg"
                backgroundColor="white"
                onSubmit={formik.handleSubmit}
                display="block"
              >
                <Heading textAlign="center">
                  Entrar
                </Heading>
                <TextField name="email" placeholder="E-mail" type="email" />
                <TextField name="password" placeholder="Contraseña" type="password" />
                <Button type="submit" w="100%" bg="#DB5752" color="white">
                  Iniciar sesión
                </Button>
              </VStack>
            </HStack>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default SignInForm
