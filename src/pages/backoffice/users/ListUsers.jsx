import React, { useEffect, useState, useCallback } from 'react'
import {
  Box,
  Heading,
} from '@chakra-ui/react'
import ItemCollapse from './ItemCollapse'
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
    <Box
      display="flex"
      height="100%"
      width="100%"
      backgroundColor="#f2f2f2"
      justifyContent="center"
    >
      <Box
        border="2px solid black"
        backgroundColor="#ffffcc"
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        w={{ base: '90%', md: '70%' }}
        m={{ base: '10px', md: '50px' }}
        p="2"
      >
        <Box display="flex" justifyContent="space-between" mx="5" my="5">
          <Heading>Usuarios</Heading>
        </Box>
        {usersData.map((item) => (
          <ItemCollapse
            key={item.id}
            item={item}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ListUsers
