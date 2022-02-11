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
  const [deletedNew, setDeletedNew] = useState([])
  const [alertProps, setAlertprops] = useState({
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
        title: 'Ooops, algo ha fallado!',
        message: error.message,
        icon: 'error',
        onConfirm: () => {},
      }
      setAlertprops(errorAlertProps)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTestimonial(id)
      setDeletedNew(id)
      window.location.reload();
    } catch (error) {
      const errorAlertProps = {
        show: true,
        title: 'Ooops, algo ha fallado!',
        message: error.message,
        icon: 'error',
        onConfirm: () => {},
      }
      setAlertprops(errorAlertProps)
    }
  }

  useEffect(() => {
    loadData()
  }, [deletedNew])
  return (
    <Box display="flex" height="100vh" width="100%" backgroundColor="#FAFA88">
      <Alert {...alertProps} />
      <Box
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        backgroundColor="white"
        w={{ base: '90%', md: 600 }}
        h="max-content"
        m="auto"
        p="2"
        justifyContent="center"
        overflow="hidden"
      >
        <Heading align="center">Testimonios</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allTestimonial.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td maxWidth="120px">
                  <ButtonGroup
                    display="flex"
                    flexWrap="wrap"
                    textAlign="center"
                    spacing="0"
                    width="fit-content"
                  >
                    <Link to={`../testimonialform/${item.id}`}>
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
