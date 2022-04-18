/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react'
import {
  Text, VStack, Grid, Box,
} from '@chakra-ui/react'
import { useLocation } from 'react-router'
import Card from '../pageUtils/Card'
import { getMemberPagination } from '../../services/membersService'
import Title from '../pageUtils/Title/Title'

const Members = () => {
  const [loadData, setLoadData] = useState([]);
  const direction = useLocation().pathname.split('/')[1]

  let currentPage = 0
  const getData = useCallback(async () => {
    const res = await getMemberPagination(20, currentPage)
    setLoadData((prev) => [...prev, ...res.data.result.rows])
    currentPage += 1
  }, [setLoadData])

  const handleScroll = (e) => {
    const { scrollHeight } = e.target.documentElement;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight,
    );
    if (currentHeight + 1 >= scrollHeight) {
      getData();
    }
  };

  useEffect(() => {
    getData()
    window.addEventListener('scroll', handleScroll)
  }, [getData]);

  return (
    <Box backgroundColor="#f2f2f2">
      <VStack my={12} display="flex" textAlign="center">
        <Title title="MIEMBROS" fontSize={30} />
        <Text fontSize="2xl" w={{ base: '80%', lg: '50%' }}>
          Estos son los miembros de Somos Más.
        </Text>
      </VStack>
      <Grid justifyContent="space-evenly" my={6} display="flex" flexWrap="wrap" gap={8} mb={12}>
        <Card
          direction={direction}
          array={loadData}
        />
      </Grid>
    </Box>
  )
}

export default Members
