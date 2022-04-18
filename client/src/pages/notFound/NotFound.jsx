import React from 'react'
import { useNavigate } from 'react-router'
import { Box, Heading, Text } from '@chakra-ui/react'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box textAlign="center" h="100%" py="200px" px="50px">
      <Heading color="red">Esta pagina no existe o no tienes acceso</Heading>
      <Text fontSize="2xl" cursor="pointer" mt="20px" onClick={() => navigate(-1)}>
        Click aquí para regresar
      </Text>
    </Box>
  )
}

export default NotFound
