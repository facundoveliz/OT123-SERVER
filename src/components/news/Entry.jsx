import React, { useEffect, useState, useCallback } from 'react'
import {
  Center, Box, Heading, Text, Image, Icon,
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import { getNewById } from '../../services/newsService'

const Entry = () => {
  const [entryData, setEntryData] = useState([]);

  const { id } = useParams()

  const navigate = useNavigate()

  const getEntry = useCallback(async () => {
    const res = await getNewById(id)
    setEntryData(res.data.result)
  }, [id, setEntryData])

  useEffect(() => {
    getEntry()
  }, [getEntry]);

  return (
    <Center my={6}>
      <Box w={{ base: '90%', md: '60%', xl: '40%' }}>
        <Icon
          as={FiArrowLeft}
          w={8}
          h={8}
          mb={4}
          cursor="pointer"
          onClick={() => {
            navigate('/novedades')
          }}
        />
        <Heading as="h1" size="2xl" textAlign="justify">{entryData.name}</Heading>
        <Image src={entryData.image} my={6} w="100%" h="400px" objectFit="cover" borderRadius="lg" boxShadow="lg" />
        <Text fontSize="xl" textAlign="justify">{entryData.content}</Text>
      </Box>
    </Center>
  )
}

export default Entry
