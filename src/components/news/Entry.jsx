import React, { useEffect, useState, useCallback } from 'react'
import {
  Center, Box, Heading, Text, Image,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { getNewById } from '../../services/newsService'

const Entry = () => {
  const [entryData, setEntryData] = useState([]);

  const { id } = useParams()

  const getEntry = useCallback(async () => {
    const res = await getNewById(id)
    setEntryData(res.data.result)
  }, [setEntryData])

  useEffect(() => {
    getEntry()
  }, [getEntry]);

  return (
    <Center my={6}>
      <Box w={{ base: '90%', md: '60%', xl: '40%' }}>
        <Heading as="h1" size="2xl" textAlign="justify">{entryData.name}</Heading>
        <Image src={entryData.image} my={6} w="100%" h="400px" objectFit="cover" borderRadius="lg" boxShadow="lg" />
        <Text fontSize="xl" textAlign="justify">{entryData.content}</Text>
      </Box>
    </Center>
  )
}

export default Entry
