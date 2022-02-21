import React, { useEffect, useState } from 'react'
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
import { getAll, deleteNews } from '../../../services/newsService'
import Alert from '../../../components/alert/Alert'

const ListNews = () => {
  const [newsData, setNewsData] = useState([])
  const [deletedNews, setDeletedNews] = useState([])
  const [alertProps, setAlertProps] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  async function loadData() {
    try {
      const response = await getAll()
      setNewsData(response.data.result.news)
    } catch (error) {
      const errorAlertProps = {
        show: true,
        title: 'Novedades:',
        message: 'Hubo un error!',
        icon: 'error',
        onConfirm: () => {},
      }
      setAlertProps(errorAlertProps)
    }
  }

  const confirmDelete = async (id) => {
    try {
      const confirmedDelete = await deleteNews(id)
      if (confirmedDelete) {
        setAlertProps({
          show: true,
          title: 'Novedad Eliminada!',
          message: 'Novedad eliminada de forma exitosa!',
          icon: 'success',
          cancelbtn: false,
          onConfirm: () => {
            setDeletedNews(id)
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
      message: 'Esta acción es permanente. ¿Eliminar novedad?',
      icon: 'warning',
      cancelbtn: true,
      onConfirm: () => confirmDelete(id),
      onCancel: () => {},
    })
  }

  useEffect(() => {
    loadData()
  }, [deletedNews])

  return (
    <Box display="flex" height="100vh" width="100%" backgroundColor="#FAFA88">
      <Alert {...alertProps} />
      <Box
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        backgroundColor="white"
        w="70%"
        h="max-content"
        m="auto"
        p="2"
        justifyContent="center"
        overflow="hidden"
      >
        <Heading align="center">Novedades</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Imagen</Th>
              <Th>Fecha de creación</Th>
            </Tr>
          </Thead>
          <Tbody>
            {newsData.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.image}</Td>
                <Td>{item.createdAt}</Td>
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
                    <Button
                      width="100px"
                      leftIcon={<IoTrashBin />}
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

export default ListNews
