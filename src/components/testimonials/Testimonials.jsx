/* eslint-disable no-console */
import React, { useEffect, useState, useCallback } from 'react'
import {
  Text, VStack, Grid, Stack,
} from '@chakra-ui/react'
import { useLocation } from 'react-router'
import Card from '../pageUtils/Card'
import { getAllTestimonials } from '../../services/testimonialsService'

const Testimonials = () => {
  const [loadData, setLoadData] = useState([]);
  const direction = useLocation().pathname.split('/')[1]
  const getData = useCallback(async () => {
    const res = await getAllTestimonials()
    setLoadData(res.data.result.testimonials)
  }, [setLoadData])

  useEffect(() => {
    getData()
  }, [getData]);

  return (
    <Stack backgroundColor="#f2f2f2">
      <VStack display="flex" my={6} textAlign="center">
        <Text fontSize="5xl">Testimonios</Text>
        <Text fontSize="2xl" w={{ base: '80%', lg: '50%' }}>
          Estos son los últimos testimonios en Somos Más.
        </Text>
      </VStack>
      <Grid templateColumns="repeat(auto-fill, 350px)" gap={8} mb={12} justifyContent="center">
        <Card
          direction={direction}
          array={loadData}
        />
      </Grid>
    </Stack>
  )
}

export default Testimonials
