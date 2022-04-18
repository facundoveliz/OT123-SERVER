import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { getUserData } from '../../app/slices/auth'
import useUser from '../../hooks/useUser'
import Alert from '../../components/alert/Alert'
import ProfileImage from '../../assets/img/profile.png'

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
      <Stack
        p="8"
        display="flex"
        height="100%"
        width="100%"
        backgroundColor="#f2f2f2"
        justifyContent="center"
      >
        <Flex align="center" justify="center">
          <Stack
            border="2px solid black"
            backgroundColor="#ffffcc"
            borderWidth="1px solid white"
            borderRadius="lg"
            boxShadow="lg"
            p="4"
            m="auto"
            w={{ base: '90%', md: 500 }}
            h="auto"
            overflow="auto"
          >
            <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
              <Box>

                <Image
                  border="2px solid black"
                  my={5}
                  src={user.image ? user.image : ProfileImage}
                  width="200px"
                  borderRadius="full"
                />

              </Box>
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
              <Text
                color="#DB5752"
                as="span"
              >
                {`${user.email}`}
              </Text>
            </Heading>
            <Text
              fontSize={{ base: 'md', lg: 'lg' }}
              color="gray.500"
            >
              ¡Hola! Aquí podrás editar la información de tu perfil, así como eliminarlo
              junto con tu cuenta.
            </Text>
            <Stack
              direction={{ base: 'column' }}
              spacing={4}
            >
              <Button
                rounded="xl"
                backgroundColor="#ccebff"
                border="2px solid black"
                _hover={{
                  backgroundColor: '#4db8ff',
                }}
                onClick={() => { navigate(`/auth/editarperfil/${id}`) }}
              >
                Editar perfil
              </Button>
              <Button
                border="2px solid black"
                rounded="xl"
                backgroundColor="#ffc2b3"
                _hover={{
                  backgroundColor: '#ff4d4d',
                }}
                onClick={() => { deleteAccount(id) }}
              >
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
