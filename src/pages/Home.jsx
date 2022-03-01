import React, { useEffect, useState } from 'react'
import {
  Text, SimpleGrid, Grid, Box,
} from '@chakra-ui/react'
import { getAllSliders } from '../services/slidersService'
import { getAllTestimonials } from '../services/testimonialsService'
import { getOrganizationById } from '../services/organizationsService'
import { getAll } from '../services/newsService'
import Slider from '../components/home/Slider'
import { TestmonialCard } from './backoffice/testimonials/ListTestimonials'
import Card from '../components/pageUtils/Card'
import Title from '../components/pageUtils/Title/Title'

const Home = () => {
  const [sliderData, setSliderData] = useState([])
  const [newsData, setNewsData] = useState([])
  const [testimonialsData, setTestimonialsData] = useState([])
  const [organizationData, setOrganizationData] = useState({})

  const loadData = async () => {
    const sliders = await getAllSliders()
    setSliderData(sliders.data.result.sliders)
    const testimonials = await getAllTestimonials()
    setTestimonialsData(testimonials.data.result.testimonials.slice(0, 4))
    const organization = await getOrganizationById(1)
    setOrganizationData(organization.data.result.publicData)
    const news = await getAll()
    setNewsData(news.data.result.news.slice(0, 3))
  }

  useEffect(() => {
    loadData();
  }, [])
  return (
    <Box>
      <Slider sliderData={sliderData} />
      <Text textAlign="center" fontSize="3xl" my={5}>{organizationData.welcomeText}</Text>

      <Title title="ULTIMAS NOVEDADES" fontSize={19} />
      <Grid display="flex" flexWrap="wrap" gap={10} mb={12} justifyContent="space-evenly">
        <Card
          direction="novedades"
          array={newsData}
        />
      </Grid>
      <Title title="TESTIMONIOS" fontSize={25} />
      <SimpleGrid
        display="flex"
        flexWrap="wrap"
        columns={{ base: 1, xl: 2 }}
        spacing="20"
        justifyContent="space-around"
        mt={16}
        mx="auto"
        marginBottom="75"
      >
        {testimonialsData
        && testimonialsData?.map((cardInfo, index) => (
          <TestmonialCard {...cardInfo} index={index} key={cardInfo.id} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Home
