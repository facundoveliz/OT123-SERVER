import React from 'react'
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
  let user = useSelector(getUserData)
  user = user.payload.persistedReducer.userData.dataValues

  return (
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
            >
              Editar perfil
            </Button>
            <Button rounded="xl">
              Eliminar cuenta
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  )
}

export default Profile
