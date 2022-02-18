/* eslint-disable no-console */
import React, { useEffect, useState, useCallback } from 'react'
import { Text, VStack, Grid } from '@chakra-ui/react'
import { useLocation } from 'react-router'
import Card from '../pageUtils/Card'
import { getAllmembers } from '../../services/membersService'

const Members = () => {
  const [loadData, setLoadData] = useState([]);
  const direction = useLocation().pathname.split('/')[1]
  const getData = useCallback(async () => {
    const res = await getAllmembers()
    setLoadData(res.data.result.members)
  }, [setLoadData])

  useEffect(() => {
    getData()
  }, [getData]);

  return (
    <>
      <VStack my={12} display="flex" textAlign="center">
        <Text fontSize="5xl">Miembros</Text>
        <Text fontSize="2xl" w={{ base: '80%', lg: '50%' }}>
          Estos son los miembros de Somos Más.
        </Text>
      </VStack>
      <Grid templateColumns="repeat(auto-fill, 350px)" gap={8} mb={12} justifyContent="center">
        <Card
          direction={direction}
          array={loadData}
        />
      </Grid>
    </>
  )
}

export default Members
