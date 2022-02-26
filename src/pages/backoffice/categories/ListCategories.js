import React, { useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import {
  Box, Table, Heading, Tbody, Button,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import {
  getAllCategories,
} from '../../../services/categoriesService'
import Alert from '../../../components/alert/Alert'
import ItemCollapse from './ItemCollapse'

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

  useEffect(() => {
    loadData()
  }, [deletedCategory])

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
              <ItemCollapse
                item={item}
                setAlertProps={setAlertProps}
                setDeletedCategory={setDeletedCategory}
              />

            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default ListCategories
