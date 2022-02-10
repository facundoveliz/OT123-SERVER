import React, { useEffect, useState, useCallback } from 'react'
import { Text, VStack, Grid } from '@chakra-ui/react'
import Card from './Card'
import { getAllNews } from '../../services/newsService'

const News = () => {
  const [entrysData, setEntrysData] = useState([]);

  const getEntrys = useCallback(async () => {
    const res = await getAllNews()
    setEntrysData(res.data.result.news)
  }, [setEntrysData])

  useEffect(() => {
    getEntrys()
  }, [getEntrys]);

  return (
    <>
      <VStack my={12} display="flex" textAlign="center">
        <Text fontSize="3xl">Novedades</Text>
        <Text fontSize="xl" w={{ base: '80%', lg: '50%' }}>
          Enterate de las últimas novedades relacionadas con Somos Más.
        </Text>
      </VStack>
      <Grid templateColumns="repeat(auto-fill, 350px)" gap={8} mb={12} justifyContent="center">
        <Card entrys={entrysData} />
      </Grid>
    </>
  )
}

export default News
