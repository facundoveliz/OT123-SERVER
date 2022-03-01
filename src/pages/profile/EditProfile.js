import React, { useState, useEffect } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Heading, HStack, VStack, Button, Select,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '../../components/textfield/TextField'
import Alert from '../../components/alert/Alert'
import useUser from '../../hooks/useUser'
import { getUserById } from '../../services/usersService'

const EditProfileForm = () => {
  const navigate = useNavigate()
  const { editUser } = useUser()
  const { id } = useParams()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    roleId: 2,
  })

  const loadUser = async () => {
    if (id) {
      try {
        const userToEdit = await getUserById(id)
        setUser({
          firstName: userToEdit.data.result.firstName,
          lastName: userToEdit.data.result.lastName,
          email: userToEdit.data.result.email,
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  }

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <HStack
            p="8"
            display="flex"
            height="100%"
            width="100%"
            backgroundColor="#f2f2f2"
            justifyContent="center"
          >
            <VStack
              as="form"
              m="auto"
              p="6"
              w={{ base: '90%', md: '40%' }}
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
              <Heading as="h3" size="lg" align="center">{`Editar perfil #${id}`}</Heading>
              <TextField backgroundColor="white" name="firstName" placeholder="Nombre" marginTop="3" />
              <TextField backgroundColor="white" name="lastName" placeholder="Apellido" marginTop="1" />
              <TextField backgroundColor="white" as={Select} name="roleId" placeholder="Rol" marginTop="3">
                <option value="1">Administrador</option>
                <option value="2">Usuario normal</option>
              </TextField>
              <Box paddingTop="3">
                <Button
                  border="2px solid black"
                  backgroundColor="#d6f5d6"
                  _hover={{
                    backgroundColor: '#6fdc6f',
                  }}
                  align="center"
                  type="submit"
                  w="100%"
                  my="1"
                >
                  Guardar cambios
                </Button>
              </Box>
            </VStack>
          </HStack>
        )}
      </Formik>
    </>
  )
}

export default EditProfileForm
