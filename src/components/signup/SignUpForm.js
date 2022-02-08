import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Heading, HStack, VStack, Button,
} from '@chakra-ui/react';
import TextField from '../TextField';
import { signUp } from '../../services/usersService'

const handleSubmit = async (data) => {
  const userData = await signUp({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  })
  const user = userData.data.result.user.dataValues
  const msg = `¡Te has registrado ${user.firstName} ${user.lastName}!`
  alert(msg)
}

const SignUpForm = () => (
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
      actions.resetForm();
    }}
  >
    {(formik) => (
      <HStack display="flex" height="100vh" backgroundColor="#FAFA88">
        <VStack
          as="form"
          m="auto"
          p="2"
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
          <Heading align="center">Registro</Heading>
          <TextField name="firstName" placeholder="Nombre" />
          <TextField name="lastName" placeholder="Apellido" />
          <TextField name="email" placeholder="E-mail" type="email" />
          <TextField name="password" placeholder="Contraseña" type="password" />
          <Button type="submit" w="100%">
            Crear cuenta
          </Button>
        </VStack>
      </HStack>
    )}
  </Formik>
)

export default SignUpForm
