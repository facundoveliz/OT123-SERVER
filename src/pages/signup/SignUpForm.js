import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Image, Heading, HStack, VStack, Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import TextField from '../TextField';
import { signUp } from '../../services/usersService'
import Alert from '../../components/alert/Alert'

const SignUpForm = () => {
  const navigate = useNavigate()

  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
  })

  const errorAlert = {
    show: true,
    title: '¡Registro fallido!',
    message: 'No se ha podido completar el registro.',
    icon: 'error',
    buttons: false,
    onConfirm: () => {},
  }

  const handleSubmit = async (data) => {
    const userData = await signUp({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
    if (userData) {
      const user = userData.data.result.user.dataValues
      const msg = `¡Gracias por unirte a SOMOS MÁS ${user.firstName} ${user.lastName}!`
      const successAlert = {
        show: true,
        title: '¡Registro exitoso!',
        message: msg,
        icon: 'success',
        onConfirm: () => {},
      }
      setAlerts(successAlert)
      setTimeout(navigate('/signin'), 500)
    } else {
      setAlerts(errorAlert)
    }
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
        onSubmit={(values) => {
          handleSubmit(values)
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
                p="6"
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
                <Heading as="h3" size="lg" align="center">Registro</Heading>
                <TextField name="firstName" placeholder="Nombre" my="1" />
                <TextField name="lastName" placeholder="Apellido" my="1" />
                <TextField name="email" placeholder="E-mail" type="email" my="1" />
                <TextField name="password" placeholder="Contraseña" type="password" my="1" />
                <Button align="center" type="submit" w="100%" bg="#DB5752" color="white" my="1">
                  Crear cuenta
                </Button>
              </VStack>
            </HStack>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default SignUpForm
