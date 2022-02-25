import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { getUserData } from '../../app/slices/auth'
import useUser from '../../hooks/useUser'
import Alert from '../../components/alert/Alert'

const Profile = () => {
  const navigate = useNavigate()
  let user = useSelector(getUserData)
  user = user.payload.persistedReducer.userData.dataValues
  const { id } = user
  const { delUser } = useUser()

  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    buttons: false,
    onConfirm: () => {},
  })

  const goodbyeAlert = {
    show: true,
    title: '¡Se ha eliminado tu cuenta!',
    message: 'Lamentamos que te vayas...',
    icon: 'success',
    buttons: false,
  }

  const stayAlert = {
    show: true,
    title: '¡Gracias por quedarte con nosotros!',
    message: 'Los niños te lo agradecen.',
    icon: 'success',
    buttons: false,
  }

  const confirmationAlert = {
    show: true,
    title: '¿Estás seguro de que querés eliminar tu cuenta?',
    message: 'Esta acción no se puede deshacer.',
    cancelbtn: true,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Eliminar cuenta',
    denyButtonText: 'Cancelar',
    onConfirm: () => {
      delUser(id)
      setAlerts(goodbyeAlert)
      navigate('/')
    },
    onCancel: () => {
      setAlerts(stayAlert)
    },
    timer: '600000',
  }

  const deleteAccount = () => {
    setAlerts(confirmationAlert)
  }

  return (
    <>
      <Alert {...alerts} />
      <Stack minH="100vh">
        <Flex p={8} flex={1} align="center" justify="center">
          <Stack spacing={6} w="full" maxW="lg">
            <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
              <Text
                as="span"
                position="relative"
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: '#DB5752',
                  zIndex: -1,
                }}
              >
                {`${user.firstName} ${user.lastName}`}
              </Text>
              <br />
              <Text color="#DB5752" as="span">
                {`${user.email}`}
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color="gray.500">
              ¡Hola! Aquí podrás editar la información de tu perfil, así como eliminarlo
              junto con tu cuenta.
            </Text>
            <Stack direction={{ base: 'column' }} spacing={4}>
              <Button
                rounded="xl"
                bg="#DB5752"
                color="white"
                _hover={{
                  bg: '#990000',
                }}
                onClick={() => { navigate(`/auth/editarperfil/${id}`) }}
              >
                Editar perfil
              </Button>
              <Button rounded="xl" onClick={() => { deleteAccount(id) }}>
                Eliminar cuenta
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </>
  )
}

export default Profile
