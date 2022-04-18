/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import {
  Box, Heading, Icon,
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'
import { getUserPagination } from '../../../services/usersService'
import Alert from '../../../components/alert/Alert'
import ItemCollapseUsers from './ItemCollapseUsers'

const UsersList = () => {
  const navigate = useNavigate()
  const [usersData, setUsersData] = useState([])
  const [deletedUser, setDeletedUser] = useState([])
  const [alertProps, setAlertProps] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  let currentPage = 0
  async function loadData() {
    try {
      const response = await getUserPagination(20, currentPage)
      setUsersData((prev) => [...prev, ...response.data.result.rows])
      currentPage += 1
    } catch (error) {
      const errorAlertProps = {
        show: true,
        title: 'Novedades:',
        message: '¡Hubo un error!',
        icon: 'error',
        onConfirm: () => {},
      }
      setAlertProps(errorAlertProps)
    }
  }
  const handleScroll = (e) => {
    const { scrollHeight } = e.target.documentElement;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight,
    );
    if (currentHeight + 1 >= scrollHeight) {
      loadData();
    }
  };

  useEffect(() => {
    loadData()
    window.addEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedUser])

  return (
    <Box
      display="flex"
      height="100%"
      width="100%"
      backgroundColor="#f2f2f2"
      justifyContent="center"
    >
      <Alert {...alertProps} />
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
          <ItemCollapseUsers
            item={item}
            setAlertProps={setAlertProps}
            setDeletedUser={setDeletedUser}
          />
        ))}
      </Box>
    </Box>
  )
}

export default UsersList
