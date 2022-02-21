/* eslint-disable no-console */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import {
  Text,
} from '@chakra-ui/react'
import { getAllSliders } from '../services/slidersService'
import Slider from '../components/home/Slider'

const Home = () => {
  const [sliderData, setSliderData] = useState([])

  const loadSliders = async () => {
   const sliders = await getAllSliders()
   setSliderData(sliders.data.result.sliders)
  }

  useEffect(() => {
    loadSliders();
  }, [])

  return (
    <>
      <Slider sliderData={sliderData} />
      <Text textAlign="center" fontSize="3xl" my={5}>Texto de Bienvenida</Text>
      <Text textAlign="center" fontSize="2xl" mb={2}>Últimas novedades</Text>
      <Text textAlign="center" fontSize="2xl">Testimonios</Text>
    </>
)
}

export default Home
