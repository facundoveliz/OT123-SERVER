import React, { useEffect, useState } from 'react'
import { IoTrashBin, IoPencil, IoAddOutline } from 'react-icons/io5'
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
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { deleteActivity, getAllActivities } from '../../../services/activitiesService'
import Alert from '../../../components/alert/Alert'

const ListActivities = () => {
  const navigate = useNavigate()
  const [allActivities, setAllActivities] = useState([{}])
  const [deletedActivity, setDeletedActivity] = useState([])
  const [alertProps, setAlertProps] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  async function loadData() {
    try {
      const response = await getAllActivities()
      setAllActivities(response.data.result.activities)
    } catch (error) {
      const errorAlertProps = {
        show: true,
        title: 'Hubo un error!',
        message: error.message,
        icon: 'error',
        onConfirm: () => {},
      }
      setAlertProps(errorAlertProps)
    }
  }

  const confirmDelete = async (id) => {
    try {
      const confirmedDelete = await deleteActivity(id)
      if (confirmedDelete) {
        setAlertProps({
          show: true,
          title: 'actividad Eliminada!',
          message: 'Actividad eliminada de forma exitosa!',
          icon: 'success',
          cancelbtn: false,
          onConfirm: () => {
            setDeletedActivity(id)
            window.location.reload();
          },
        })
      }
    } catch (error) {
      setAlertProps({
        show: true,
        title: 'Hubo un error!',
        message: error.message,
        icon: 'error',
        cancelbtn: true,
        onConfirm: () => {},
        onCancel: () => {},
      })
    }
  }

  const handleDelete = (id) => {
    setAlertProps({
      show: true,
      title: 'Estas Seguro?',
      message: 'Esta acción es permanente. ¿Eliminar actividad?',
      icon: 'warning',
      cancelbtn: true,
      onConfirm: () => confirmDelete(id),
      onCancel: () => {},
    })
  }

  useEffect(() => {
    loadData()
  }, [deletedActivity])
  return (
    <Box display="flex" height="100%" width="100%" backgroundColor="#FAFA88" justifyContent="center">
      <Alert {...alertProps} />
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
        <Box display="flex" justifyContent="space-between" mx="6" my="5">
          <Heading>Actividades</Heading>
          <Button leftIcon={<IoAddOutline size="22" />} onClick={() => navigate('./nuevo')}>
            Crear nuevo
          </Button>
        </Box>
        <Heading align="center">Activities</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Imagen</Th>
              <Th>Creado</Th>
              <Th>Actualizado</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allActivities.map((item) => (

              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td onClick={() => window.open(item.image)} cursor="pointer" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxW="200px">{item.image}</Td>
                <Td>{item.createdAt}</Td>
                <Td>{item.updatedAt}</Td>
                <Td display="flex" justifyContent="center">
                  <ButtonGroup
                    flexWrap="wrap"
                    textAlign="center"
                    width="fit-content"
                  >
                    <Link to={`../activitiesform/${item.id}`}>
                      <Button
                        width="100px"
                        leftIcon={<IoPencil />}
                        marginRight="6"
                        marginBottom="1"
                        size="sm"
                      >
                        Editar
                      </Button>
                    </Link>
                    <Button
                      width="100px"
                      leftIcon={<IoTrashBin />}
                      marginBottom="1"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >

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

export default ListActivities
