import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Center, Box, Heading, Text, Image,
} from '@chakra-ui/react'
import { getActivityById } from '../../../services/activitiesService'
import Loading from '../../../components/Loading'
import Alert from '../../../components/alert/Alert'

const Activity = () => {
  const [activityData, setActivityData] = useState(false)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  useEffect(() => {
    const request = async () => {
      try {
        getActivityById(id)
          .then((res) => {
            if (res.data) {
              setActivityData(res.data)
              setLoading(false)
            }
          })
      } catch (error) {
        const errorAlert = {
          show: true,
          title: 'Ooops, algo ha fallado!',
          message: error.message,
          icon: 'error',
          onConfirm: () => {},
        }
        setAlerts(errorAlert)
      }
    }
    request()
  }, [id])

  return (
    <Loading active={loading}>
      <>
        <Alert {...alerts} />
        {
                activityData

                && (
                <Center my={6}>
                  <Box w={{ base: '90%', md: '60%', xl: '40%' }}>
                    <Heading as="h1" size="2xl" textAlign="justify">{activityData.name}</Heading>
                    <Image src={activityData.image} my={6} w="100%" h="400px" objectFit="cover" borderRadius="lg" boxShadow="lg" />
                    <Text fontSize="xl" textAlign="justify">{activityData.content}</Text>
                  </Box>
                </Center>
                )

            }
      </>
    </Loading>
  )
}
export default Activity
