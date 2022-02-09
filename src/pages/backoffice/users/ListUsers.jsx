import React, { useEffect, useState, useCallback } from 'react'
import { IoTrashBin, IoPencil } from 'react-icons/io5'
import {
  Box,
  Table,
  Heading,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { getAllUsers } from '../../../services/usersService'

const ListUsers = () => {
  const [usersData, setUsersData] = useState([]);

  const getUsers = useCallback(async () => {
    const res = await getAllUsers()
    setUsersData(res.data.result.user)
  }, [setUsersData])

  useEffect(() => {
    getUsers()
  }, [getUsers]);

  return (
    <Box display="flex" height="100vh" width="100%" backgroundColor="#FAFA88">
      <Box
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        backgroundColor="white"
        w="90%"
        h="max-content"
        m="auto"
        p="2"
        justifyContent="center"
        overflow="hidden"
      >
        <Heading align="center">Users</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>Email</Th>
              <Th>Imagen</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usersData.map((item) => (
              <Tr key={item.id}>
                <Td>{item.firstName}</Td>
                <Td>{item.lastName}</Td>
                <Td>{item.email}</Td>
                <Td>{item.image}</Td>
                <Td maxWidth="120px">
                  <ButtonGroup
                    display="flex"
                    flexWrap="wrap"
                    textAlign="center"
                    spacing="0"
                    width="fit-content"
                  >
                    <Button
                      width="100px"
                      leftIcon={<IoPencil />}
                      marginRight="6"
                      marginBottom="1"
                      size="sm"
                    >
                      Editar
                    </Button>
                    <Button width="100px" leftIcon={<IoTrashBin />} size="sm">
                      Eliminar
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default ListUsers
