import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, ButtonGroup } from '@chakra-ui/button'
import {
  Box, Center, ListItem, Text, UnorderedList,
} from '@chakra-ui/layout'
import { Collapse, useDisclosure } from '@chakra-ui/react'
import { IoArrowDownOutline, IoPencil, IoTrashBin } from 'react-icons/io5'
import moment from 'moment';
import PropTypes from 'prop-types'
import { deleteCategory } from '../../../services/categoriesService'

const ItemCollapse = ({ item, setAlertProps, setDeletedCategory }) => {
  const navigate = useNavigate()
  const { isOpen, onToggle } = useDisclosure()
  const [openCollapse, setopenCollapse] = useState(false)
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
      >
        <Button
          w="100%"
          border="2px solid black"
          onClick={() => { onToggle(); setopenCollapse(!openCollapse) }}
        >
          {item.name}
        </Button>
      </Box>
      {openCollapse
      && (
      <Center>
        <IoArrowDownOutline size="25" />
      </Center>
      )}
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
              <Text
                fontSize="xl"
                textAlign="justify"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Creación:
              </Text>
              {moment(item.createdAt).format('DD/MM/YYYY h:mm:ss a')}
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Última actualización:
              </Text>
              {moment(item.updatedAt).format('DD/MM/YYYY h:mm:ss a')}
            </ListItem>
          </UnorderedList>
          <Box display="flex" justifyContent="center">
            <ButtonGroup
              paddingTop="4"
              flexWrap="wrap"
              textAlign="center"
              width="fit-content"
              color="black"
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
          </Box>
        </Box>
      </Collapse>
    </>
  )
}
ItemCollapse.propTypes = {
  item: PropTypes.shape(
    {
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      updatedAt: PropTypes.string,
      createdAt: PropTypes.string,
    },
  ).isRequired,
  setAlertProps: PropTypes.func.isRequired,
  setDeletedCategory: PropTypes.func.isRequired,
}
export default ItemCollapse
