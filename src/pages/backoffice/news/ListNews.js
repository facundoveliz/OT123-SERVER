import React, { useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import {
  Box, Heading, Button,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { getAll } from '../../../services/newsService'
import Alert from '../../../components/alert/Alert'
import ItemCollapse from './itemCollapse'

const ListNews = () => {
  const navigate = useNavigate()
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

  useEffect(() => {
    loadData()
  }, [deletedNews])

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
          <Heading>Novedades</Heading>
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
        <Box>
          {newsData.map((item) => (
            <ItemCollapse
              key={item.id}
              item={item}
              setAlertProps={setAlertProps}
              setDeletedNews={setDeletedNews}
            />
          ))}
        </Box>
        {' '}

      </Box>
    </Box>
  )
}

export default ListNews
