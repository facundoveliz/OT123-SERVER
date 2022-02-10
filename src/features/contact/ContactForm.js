/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Heading, HStack, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import TextField from './TextField';
import createContact from '../../services/contactsService'

const ContactForm = () => {
  const handleSubmit = async (data) => {
    const contactData = await createContact({
      name: data.name,
      email: data.email,
      message: data.message,
    })
    const msg = '¡El contacto fue creado!'
    alert(msg)
  }

  return (
    // eslint-disable-next-line react/self-closing-comp
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Nombre requerido!').min(3, 'Nombre muy corto!'),
        email: Yup.string().email('E-mail inválido!').required('E-mail requerido!'),
        message: Yup.string().required('El mensaje es requerido!').min(6, 'Mensaje muy corto'),
      })}
      onSubmit={(values, actions) => {
        handleSubmit(values)
        actions.resetForm();
      }}
    >
      {(formik) => (
        <HStack display="flex" backgroundColor={'brand.lightBlue'}>
          <VStack
            as="form"
            m="auto"
            p="2"
            w={{ base: 300, md: 500, sm: 400 }}
            h="auto"
            justifyContent="center"
            borderWidth="1px solid white"
            borderRadius="lg"
            // eslint-disable-next-line jsx-quotes
            boxShadow='lg'
            backgroundColor={'white'}
            onSubmit={formik.handleSubmit}
            display="block"
          >
            <Heading align="center" color="gray.500">Mensaje</Heading>
            <TextField name="name" placeholder="Nombre" label="Nombre" />
            <TextField name="email" placeholder="E-mail" type="email" label="Email" />
            <TextField name="message" placeholder="Mensaje" type="textarea" label="Mensaje" />
            <Button type="submit" w="100%" backgroundColor={'brand.yellow'} color="gray.500">
              Crear cuenta
            </Button>
          </VStack>
        </HStack>
      )}
    </Formik> // eslint-disable-next-line react/jsx-indent
  );
};
export default ContactForm
