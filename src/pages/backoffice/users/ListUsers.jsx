import React, { useEffect, useState, useCallback } from 'react'
import {
  Box,
  Heading, Icon,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import ItemCollapse from './itemCollapse'
import { getAllUsers } from '../../../services/usersService'

const ListUsers = () => {
  const navigate = useNavigate()
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
        <Box width="100%">
          <Icon
            alignitems="left"
            as={FiArrowLeft}
            w={8}
            h={8}
            mb={4}
            border="2px solid black"
            borderRadius="lg"
            boxShadow="lg"
            backgroundColor="#ccebff"
            _hover={{
              backgroundColor: '#4db8ff',
              transition: 'all 0.3s ease',
            }}
            cursor="pointer"
            onClick={() => {
              navigate(-1)
            }}
          />
        </Box>
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
