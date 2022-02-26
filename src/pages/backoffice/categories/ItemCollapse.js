import { Button, ButtonGroup } from '@chakra-ui/button'
import {
  Box, ListItem, Text, UnorderedList,
} from '@chakra-ui/layout'
import { Collapse, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { IoPencil, IoTrashBin } from 'react-icons/io5'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'
import { deleteCategory } from '../../../services/categoriesService'

const ItemCollapse = ({ item, setAlertProps, setDeletedCategory }) => {
  const navigate = useNavigate()
  const { isOpen, onToggle } = useDisclosure()

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
  return (
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
              {item.createdAt}
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Actualizado:
              </Text>
              {' '}
              {item.updatedAt}
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
  )
}
ItemCollapse.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      updatedAt: PropTypes.string,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
  setAlertProps: PropTypes.func.isRequired,
  setDeletedCategory: PropTypes.func.isRequired,
}
export default ItemCollapse
