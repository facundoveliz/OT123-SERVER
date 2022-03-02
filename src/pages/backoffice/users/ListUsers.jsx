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
import { getUserPagination } from '../../../services/usersService'

const ListUsers = () => {
  const [usersData, setUsersData] = useState([]);

  let currentPage = 0
  const getUsers = useCallback(async () => {
    const res = await getUserPagination(20, currentPage)
    setUsersData((prev) => [...prev, ...res.data.result.rows])
    currentPage += 1
  }, [setUsersData])

  const handleScroll = (e) => {
    const { scrollHeight } = e.target.documentElement;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight,
    );
    if (currentHeight + 1 >= scrollHeight) {
      getUsers();
    }
  };

  useEffect(() => {
    getUsers()
    window.addEventListener('scroll', handleScroll)
  }, [getUsers]);

  return (
    <Box display="flex" height="100%" width="100%" backgroundColor="#FAFA88" justifyContent="center">
      <Box
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        backgroundColor="white"
        w={{ base: '98%', md: '90%' }}
        m={{ base: '10px', md: '50px' }}
        p="2"
        overflow="auto"
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
                <Td display="flex" justifyContent="center">
                  <ButtonGroup
                    flexWrap="wrap"
                    textAlign="center"
                    width="fit-content"
                  >
                    <Button
                      width="100px"
                      leftIcon={<IoPencil />}
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
