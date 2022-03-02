/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react'
import {
  Text, VStack, Grid, Stack,
} from '@chakra-ui/react'
import { useLocation } from 'react-router'
import Card from '../pageUtils/Card'
import { getEntryPagination } from '../../services/newsService'
import Title from '../pageUtils/Title/Title'

const News = () => {
  const [entrysData, setEntrysData] = useState([]);
  const direction = useLocation().pathname.split('/')[1]

  let currentPage = 0
  const getEntrys = useCallback(async () => {
    const res = await getEntryPagination(20, currentPage)
    setEntrysData((prev) => [...prev, ...res.data.result.rows])
    currentPage += 1
  }, [setEntrysData])

  const handleScroll = (e) => {
    const { scrollHeight } = e.target.documentElement;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight,
    );
    if (currentHeight + 1 >= scrollHeight) {
      getEntrys();
    }
  };

  useEffect(() => {
    getEntrys()
    window.addEventListener('scroll', handleScroll)
  }, [getEntrys]);

  return (
    <Stack w="100%" backgroundColor="#f2f2f2" paddingBottom="10">
      <VStack my={6} display="flex" textAlign="center">
        <Title title="NOVEDADES" fontSize={30} />
        <Text fontSize="2xl" w={{ base: '80%', lg: '50%' }}>
          Enterate de las últimas novedades relacionadas con Somos Más.
        </Text>
      </VStack>
      <Grid justifyContent="space-evenly" my={6} display="flex" flexWrap="wrap" gap={8} mb={12}>
        <Card
          direction={direction}
          array={entrysData}
        />
      </Grid>
    </Stack>
  )
}

export default News
