import React, { useEffect, useState } from 'react'
import {
  Box, Table, Heading, Tbody,
} from '@chakra-ui/react'
import { getAllUsers } from '../../../services/usersService'
import Alert from '../../../components/alert/Alert'
import ItemCollapseUsers from './ItemCollapseUsers'

const UsersList = () => {
  const [usersData, setUsersData] = useState([])
  const [deletedUser, setDeletedUser] = useState([])
  const [alertProps, setAlertProps] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  async function loadData() {
    try {
      const response = await getAllUsers()
      setUsersData(response.data.result.user)
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

  useEffect(() => {
    loadData()
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
        <Box display="flex" justifyContent="space-between" mx="5" my="5">
          <Heading>Usuarios</Heading>
        </Box>
        <Table size="lg">
          <Tbody>
            {usersData.map((item) => (
              <ItemCollapseUsers
                item={item}
                setAlertProps={setAlertProps}
                setDeletedUser={setDeletedUser}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default UsersList
