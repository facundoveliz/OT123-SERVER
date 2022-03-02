import React, { useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import {
  Box, Heading, Button, Icon,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { FiArrowLeft } from 'react-icons/fi';
import { getActivityPagination } from '../../../services/activitiesService'
import Alert from '../../../components/alert/Alert'
import ItemCollapse from './itemCollapse'

const ListActivities = () => {
  const navigate = useNavigate()
  const [activitiesData, setActivitiesData] = useState([])
  const [deletedActivity, setDeletedActivity] = useState({})
  const [alertProps, setAlertProps] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  let currentPage = 0
  async function loadData() {
    try {
      const response = await getActivityPagination(20, currentPage)
      setActivitiesData((prev) => [...prev, ...response.data.result.rows])
      currentPage += 1
    } catch (error) {
      const errorAlertProps = {
        show: true,
        title: 'Actividades:',
        message: 'Hubo un error!',
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
  }, [deletedActivity])

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
          <Heading>Actividades</Heading>
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

        {activitiesData.map((item) => (
          <ItemCollapse
            key={item.id}
            item={item}
            setAlertProps={setAlertProps}
            setDeletedActivity={setDeletedActivity}
          />
        ))}

      </Box>
    </Box>
  )
}

export default ListActivities
