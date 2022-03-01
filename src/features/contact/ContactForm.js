import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Heading, HStack, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useNavigate } from 'react-router-dom';
import TextField from './TextField';
import { createContact } from '../../services/contactsService'
import Alert from '../../components/alert/Alert'

const ContactForm = () => {
  const navigate = useNavigate()
  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  const handleSubmit = async (data) => {
    const contactData = await createContact({
      name: data.name,
      email: data.email,
      message: data.message,
    })

    const msg = '¡El contacto fue creado!'
    if (contactData) {
      const successAlert = {
        show: true,
        title: 'Contacto',
        message: msg,
        icon: 'success',
        onConfirm: () => {},
      }
      setAlerts(successAlert)
      navigate('/')
    }
  }

  return (
    <>
      {' '}
      <Alert {...alerts} />
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Nombre requerido!').min(3, 'Nombre muy corto!'),
          email: Yup.string().email('E-mail inválido!').required('E-mail requerido!'),
          phone: Yup.string().email('Teléfono inválido!').required('Teléfono requerido!'),
          message: Yup.string().required('El mensaje es requerido!').min(6, 'Mensaje muy corto'),
        })}
        onSubmit={(values, actions) => {
          handleSubmit(values)
          actions.resetForm();
        }}
      >
        {(formik) => (
          <HStack display="flex">
            <VStack
              as="form"
              m="auto"
              p="4"
              w={{ base: 300, md: 500, sm: 400 }}
              h="auto"
              justifyContent="center"
              borderWidth="1px solid white"
              borderRadius="lg"
              boxShadow="lg"
              border="2px solid black"
              backgroundColor="#ffffcc"
              onSubmit={formik.handleSubmit}
              display="block"
            >
              <Heading align="center">Mensaje</Heading>
              <TextField backgroundColor="white" name="name" placeholder="Nombre" label="Nombre" type="text" />
              <TextField backgroundColor="white" name="phone" placeholder="Teléfono" label="Teléfono" type="number" />
              <TextField backgroundColor="white" name="email" placeholder="E-mail" type="email" label="Email" />
              <TextField backgroundColor="white" name="message" placeholder="Mensaje" type="textarea" label="Mensaje" />
              <Button
                type="submit"
                w="100%"
                border="2px solid black"
                backgroundColor="#d6f5d6"
                _hover={{
                  backgroundColor: '#6fdc6f',
                }}
              >
                Enviar contacto
              </Button>
            </VStack>
          </HStack>
        )}
      </Formik>
    </>
  );
};
export default ContactForm
