import React from 'react'
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

const Profile = () => {
  const navigate = useNavigate()
  let user = useSelector(getUserData)
  user = user.payload.persistedReducer.userData.dataValues
  const { id } = user

  return (
    <Stack p="8" display="flex" height="100%" width="100%" backgroundColor="#f2f2f2" justifyContent="center">
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
            >
              Eliminar cuenta
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  )
}

export default Profile
