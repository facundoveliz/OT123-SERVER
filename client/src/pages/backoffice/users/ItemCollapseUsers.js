import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, ButtonGroup } from '@chakra-ui/button'
import {
  Box, Center, ListItem, Text, UnorderedList,
} from '@chakra-ui/layout'
import { Collapse, Image, useDisclosure } from '@chakra-ui/react'
import { IoArrowDownOutline, IoPencil, IoTrashBin } from 'react-icons/io5'
import moment from 'moment';
import PropTypes from 'prop-types'
import { deleteUser } from '../../../services/usersService'

const ItemCollapseUsers = ({ item, setAlertProps, setDeletedUser }) => {
  // eslint-disable-next-line no-console
  console.log(item);
  const navigate = useNavigate()
  const { isOpen, onToggle } = useDisclosure()
  const [openCollapse, setopenCollapse] = useState(false)
  const confirmDelete = async (id) => {
    try {
      const confirmedDelete = await deleteUser(id)
      if (confirmedDelete) {
        setAlertProps({
          show: true,
          title: '¡Usuario eliminado!',
          message: '¡Usuario eliminado de forma exitosa!',
          icon: 'success',
          cancelbtn: false,
          onConfirm: () => {
            setDeletedUser(id)
            navigate('/')
          },
        })
      }
    } catch (error) {
      setAlertProps({
        show: true,
        title: '¡Hubo un error!',
        message: 'No se ha podido eliminar el usuario.',
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
      title: '¿Estás Seguro?',
      message: 'Esta acción no se puede deshacer.',
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
          {`${item.firstName} ${item.lastName}`}
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
            <ListItem onClick={() => window.open(item.image)} cursor="pointer">
              <Text fontWeight="bold">
                Imagen:
              </Text>
              <Image
                width={60}
                src={item.image}
                borderRadius="2xl"
                border="2px solid"
                my={5}
              />
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                E-mail:
              </Text>
              <Text
                fontSize="xl"
                textAlign="justify"
                dangerouslySetInnerHTML={{ __html: item.email }}
              />
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Creación:
              </Text>
              {' '}
              {moment(item.createdAt).format('DD/MM/YYYY h:mm:ss a')}
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Última actualización:
              </Text>
              {' '}
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
ItemCollapseUsers.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      updatedAt: PropTypes.string,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
  setAlertProps: PropTypes.func.isRequired,
  setDeletedUser: PropTypes.func.isRequired,
}
export default ItemCollapseUsers
