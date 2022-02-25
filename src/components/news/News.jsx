/* eslint-disable no-console */
import React, { useEffect, useState, useCallback } from 'react'
import {
  Text, VStack, Grid, Stack,
} from '@chakra-ui/react'
import { useLocation } from 'react-router'
import Card from '../pageUtils/Card'
import { getAll } from '../../services/newsService'

const News = () => {
  const [entrysData, setEntrysData] = useState([]);
  const direction = useLocation().pathname.split('/')[1]
  const getEntrys = useCallback(async () => {
    const res = await getAll()
    setEntrysData(res.data.result.news)
  }, [setEntrysData])

  useEffect(() => {
    getEntrys()
  }, [getEntrys]);

  return (
    <Stack backgroundColor="#f2f2f2" paddingBottom="10">
      <VStack my={6} display="flex" textAlign="center">
        <Text fontSize="5xl">Novedades</Text>
        <Text fontSize="2xl" w={{ base: '80%', lg: '50%' }}>
          Enterate de las últimas novedades relacionadas con Somos Más.
        </Text>
      </VStack>
      <Grid templateColumns="repeat(auto-fill, 350px)" gap={8} mb={12} justifyContent="center">
        <Card
          direction={direction}
          array={entrysData}
        />
      </Grid>
    </Stack>
  )
}

export default News
