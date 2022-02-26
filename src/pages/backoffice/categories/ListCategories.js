import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { IoTrashBin, IoPencil, IoAddOutline } from 'react-icons/io5'
import {
  Box,
  Text,
  Table,
  Heading,
  Tbody,
  UnorderedList,
  ListItem,
  Button,
  ButtonGroup,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { deleteCategory, getAllCategories } from '../../../services/categoriesService'
import Alert from '../../../components/alert/Alert'

const ListCategories = () => {
  const { isOpen, onToggle } = useDisclosure()
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
        w={{ base: '90%', md: '70%' }}
        m={{ base: '10px', md: '50px' }}
        p="2"
        overflow="auto"
      >
        <Box display="flex" justifyContent="space-between" mx="5" my="5">
          <Heading>Categorias</Heading>
          <Button
            borderRadius="full"
            border="2px solid black"
            backgroundColor="#d6f5d6"
            _hover={{
              backgroundColor: '#6fdc6f',
            }}
            onClick={() => navigate('./nuevo')}
          >
            <IoAddOutline size="22" />
          </Button>
        </Box>
        <Table size="lg">
          <Tbody>
            {allCategories.map((item) => (
              <>
                <Box
                  textAlign="center"
                  padding="1"
                >
                  <Button
                    w="100%"
                    border="2px solid black"
                    onClick={onToggle}
                  >
                    {item.name}
                  </Button>
                </Box>
                <Collapse startingHeight={5} in={isOpen} animateOpacity>
                  <Box
                    border="2px solid black"
                    marginBottom="8"
                    p="20px"
                    color="white"
                    mt="4"
                    bg="#d6f5d6"
                    rounded="md"
                    shadow="md"
                  >
                    <UnorderedList key={item.id} color="black">
                      <ListItem>
                        <Text fontWeight="bold">
                          Descripción:
                        </Text>
                        {' '}
                        {item.description}
                      </ListItem>
                      <ListItem>
                        <Text fontWeight="bold">
                          Creado:
                        </Text>
                        {' '}
                        {moment(item.createdAt).format('DD/MM/YYYY h:mm:ss a')}
                      </ListItem>
                      <ListItem>
                        <Text fontWeight="bold">
                          Actualizado:
                        </Text>
                        {' '}
                        {moment(item.updatedAt).format('DD/MM/YYYY h:mm:ss a')}
                      </ListItem>
                      <ListItem display="flex" justifyContent="center">
                        <ButtonGroup
                          paddingTop="4"
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
                      </ListItem>
                    </UnorderedList>
                  </Box>
                </Collapse>
              </>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default ListCategories
