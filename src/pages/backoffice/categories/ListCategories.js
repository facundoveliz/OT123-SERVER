import React, { useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import {
  Box, Heading, Button, Icon,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { FiArrowLeft } from 'react-icons/fi';
import {
  getCategoryPagination,
} from '../../../services/categoriesService'
import Alert from '../../../components/alert/Alert'
import ItemCollapse from './ItemCollapse'

const ListCategories = () => {
  const [allCategories, setAllCategories] = useState([])
  const [deletedCategory, setDeletedCategory] = useState([])
  const [alertProps, setAlertProps] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  const navigate = useNavigate()

  let currentPage = 0
  async function loadData() {
    try {
      const response = await getCategoryPagination(20, currentPage)
      setAllCategories((prev) => [...prev, ...response.data.result.rows])
      currentPage += 1
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

  const handleScroll = (e) => {
    const { scrollHeight } = e.target.documentElement;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight,
    );
    if (currentHeight + 1 >= scrollHeight) {
      loadData();
    }
  };

  useEffect(() => {
    loadData()
    window.addEventListener('scroll', handleScroll)
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
        <Box width="100%">
          <Icon
            alignitems="left"
            as={FiArrowLeft}
            w={8}
            h={8}
            mb={4}
            border="2px solid black"
            borderRadius="lg"
            boxShadow="lg"
            backgroundColor="#ccebff"
            _hover={{
              backgroundColor: '#4db8ff',
              transition: 'all 0.3s ease',
            }}
            cursor="pointer"
            onClick={() => {
              navigate(-1)
            }}
          />
        </Box>
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

        {allCategories.map((item) => (
          <ItemCollapse
            item={item}
            setAlertProps={setAlertProps}
            setDeletedCategory={setDeletedCategory}
            key={item.id}
          />

        ))}
      </Box>
    </Box>
  )
}

export default ListCategories
