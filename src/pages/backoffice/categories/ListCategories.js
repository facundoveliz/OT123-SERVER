import React, { useEffect, useState } from 'react'
import moment from 'moment';
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
import { deleteCategory, getAllCategories } from '../../../services/categoriesService'
import Alert from '../../../components/alert/Alert'

const ListCategories = () => {
  const [allCategories, setAllCategories] = useState([{}])
  const [deletedCategory, setDeletedCategory] = useState([])
  const [alertProps, setAlertProps] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  const navigate = useNavigate()
  async function loadData() {
    try {
      const response = await getAllCategories()
      setAllCategories(response.data.result.categories)
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
      const confirmedDelete = await deleteCategory(id)
      if (confirmedDelete) {
        setAlertProps({
          show: true,
          title: 'Categoria Eliminada!',
          message: 'Categoria eliminada de forma exitosa!',
          icon: 'success',
          cancelbtn: false,
          onConfirm: () => {
            setDeletedCategory(id)
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
      message: 'Esta acción es permanente. ¿Eliminar categoria?',
      icon: 'warning',
      cancelbtn: true,
      onConfirm: () => confirmDelete(id),
      onCancel: () => {},
    })
  }

  useEffect(() => {
    loadData()
  }, [deletedCategory])

  return (
    <Box display="flex" height="100%" width="100%" backgroundColor="#f2f2f2" justifyContent="center">
      <Alert {...alertProps} />
      <Box
        border="2px solid black"
        backgroundColor="#ffffcc"
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        w={{ base: '98%', md: '90%' }}
        m={{ base: '10px', md: '50px' }}
        p="2"
        overflow="auto"
      >
        <Box display="flex" justifyContent="space-between" mx="6" my="5">
          <Heading>Categorias</Heading>
          <Button
            border="2px solid black"
            backgroundColor="#d6f5d6"
            _hover={{
              backgroundColor: '#6fdc6f',
            }}
            leftIcon={<IoAddOutline size="22" />}
            onClick={() => navigate('./nuevo')}
          >
            Crear nuevo
          </Button>
        </Box>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Descripción</Th>
              <Th>Creado</Th>
              <Th>Actualizado</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allCategories.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.description}</Td>
                <Td>{moment(item.createdAt).format('DD/MM/YYYY')}</Td>
                <Td>{moment(item.updatedAt).format('DD/MM/YYYY')}</Td>
                <Td display="flex" justifyContent="center">
                  <ButtonGroup
                    flexWrap="wrap"
                    textAlign="center"
                    width="fit-content"
                  >
                    <Button
                      border="2px solid black"
                      width="100px"
                      leftIcon={<IoPencil />}
                      marginBottom="1"
                      size="sm"
                      backgroundColor="#ccebff"
                      _hover={{
                        backgroundColor: '#4db8ff',
                      }}
                      onClick={() => navigate(`./${item.id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      border="2px solid black"
                      width="100px"
                      leftIcon={<IoTrashBin />}
                      size="sm"
                      backgroundColor="#ffc2b3"
                      _hover={{
                        backgroundColor: '#ff4d4d',
                      }}
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

export default ListCategories
