import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Image, Heading, HStack, VStack, Button, Select,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserData } from '../../app/slices/auth'
import TextField from '../../components/textfield/TextField'
import Alert from '../../components/alert/Alert'
import useUser from '../../hooks/useUser'

const EditProfileForm = () => {
  const navigate = useNavigate()
  const userData = useSelector(getUserData)
  const user = userData.payload.userData.dataValues
  const { editUser } = useUser()
  const { id } = useParams()

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
    title: '¡Perfil editado!',
    message: 'Se han guardado tus cambios.',
    icon: 'success',
    buttons: false,
    onConfirm: () => {},
  }

  const errorAlert = {
    show: true,
    title: '¡Error editando perfil!',
    message: 'No se han guardado tus cambios.',
    icon: 'error',
    buttons: false,
    onConfirm: () => {},
  }

  const handleSubmit = (userDataToEdit) => {
    const editSuccess = editUser(id, userDataToEdit)
    editSuccess.then((success) => {
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
          firstName: user.firstName,
          lastName: user.lastName,
          roleId: user.roleId,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('¡Nombre requerido!').min(3, '¡Nombre muy corto!'),
          lastName: Yup.string().required('¡Apellido requerido!').min(3, '¡Apellido muy corto!'),
          roleId: Yup.number().required('¡Role requerido!'),
        })}
        onSubmit={(values) => {
          values.roleId = parseInt(values.roleId, 10)
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
                <Heading as="h3" size="lg" align="center">Editar perfil</Heading>
                <TextField name="firstName" placeholder="Nombre" my="1" />
                <TextField name="lastName" placeholder="Apellido" my="1" />
                <TextField as={Select} name="roleId" placeholder="Rol">
                  <option value="1">Administrador</option>
                  <option value="2">Usuario normal</option>
                </TextField>
                <Button align="center" type="submit" w="100%" bg="#DB5752" color="white" my="1">
                  Guardar cambios
                </Button>
              </VStack>
            </HStack>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default EditProfileForm
