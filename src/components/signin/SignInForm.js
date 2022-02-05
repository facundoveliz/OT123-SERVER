import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Heading, HStack, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import TextField from '../TextField';

const SignInForm = () => (
  <Formik
    initialValues={{
      email: '', password: '',
    }}
    validationSchema={Yup.object({
      email: Yup.string().email('¡E-mail inválido!').required('¡E-mail requerido!'),
      password: Yup.string().required('¡Contraseña requerida!'),
    })}
    onSubmit={(values, actions) => {
      actions.resetForm();
    }}
  >
    {(formik) => (
      <HStack display="flex" height="100vh" backgroundColor="#FAFA88">
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
          <Button type="submit" w="100%">
            Iniciar sesión
          </Button>
        </VStack>
      </HStack>
    )}
  </Formik>
)

export default SignInForm
