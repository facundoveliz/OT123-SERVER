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
import { Link } from 'react-router-dom'
import { deleteTestimonial, getAllTestimonials } from '../../../services/testimonialsService'
import Alert from '../../../components/alert/Alert'

const ListTestimonials = () => {
  const [allTestimonial, setAllTestimonial] = useState([{}])
  const [deletedTestimonial, setDeletedTestimonial] = useState([])
  const [alertProps, setAlertProps] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  async function loadData() {
    try {
      const response = await getAllTestimonials()
      setAllTestimonial(response.data.result.testimonials)
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
      const confirmedDelete = await deleteTestimonial(id)
      if (confirmedDelete) {
        setAlertProps({
          show: true,
          title: 'Testimonio Eliminada!',
          message: 'Testimonio eliminado de forma exitosa!',
          icon: 'success',
          cancelbtn: false,
          onConfirm: () => {
            setDeletedTestimonial(id)
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
      message: 'Esta acción es permanente. ¿Eliminar testimonio?',
      icon: 'warning',
      cancelbtn: true,
      onConfirm: () => confirmDelete(id),
      onCancel: () => {},
    })
  }

  useEffect(() => {
    loadData()
  }, [deletedTestimonial])

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
        <Heading align="center">Testimonios</Heading>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allTestimonial.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td display="flex" justifyContent="center">
                  <ButtonGroup
                    flexWrap="wrap"
                    textAlign="center"
                    width="fit-content"
                  >
                    <Link to={`../testimonialform/${item.id}`}>
                      <Button
                        width="100px"
                        leftIcon={<IoPencil />}
                        marginBottom="1"
                        size="sm"
                      >
                        Editar
                      </Button>
                    </Link>
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

export default ListTestimonials
