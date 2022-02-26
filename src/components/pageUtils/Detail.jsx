/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState, useCallback } from 'react'
import {
  Center, Box, Heading, Text, Image, Icon,
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import { useLocation } from 'react-router'
import { getNewById } from '../../services/newsService'
import { getTestimonial } from '../../services/testimonialsService'
import { getActivityById } from '../../services/activitiesService';
import { getMember } from '../../services/membersService';

const Detail = () => {
  const directory = useLocation().pathname.split('/')[1]

  console.log(directory);
  const [detail, setDetail] = useState([]);

  const { id } = useParams()
  const navigate = useNavigate()
  const getDetail = useCallback(async () => {
    let res = {}
    switch (directory) {
      case 'novedades':
        res = await getNewById(id)
        break;
      case 'testimonios':
        res = await getTestimonial(id)
        break;
      case 'actividades':
        res = await getActivityById(id)
        break;
      case 'nosotros':
        res = await getMember(id)
        break;

      default:
        break;
    }

    console.log(res);
    setDetail(res.data.result)
  }, [detail])

  useEffect(() => {
    getDetail()
  }, []);

  return (
    <Center backgroundColor="#f2f2f2" paddingTop={6} my={6}>
      <Box
        borderRadius="lg"
        boxShadow="lg"
        border="2px solid black"
        backgroundColor="#ffffcc"
        p={4}
        w={{ base: '90%', md: '60%', xl: '40%' }}
      >
        <Icon
          as={FiArrowLeft}
          w={8}
          h={8}
          mb={4}
          border="2px solid black"
          borderRadius="lg"
          boxShadow="lg"
          backgroundColor="#ccebff"
          _hover={{
            backgroundColor: '#4db8ff',
            transition: 'all 0.3s ease',
          }}
          cursor="pointer"
          onClick={() => {
            navigate(-1)
          }}
        />
        <Heading as="h1" size="2xl" textAlign="justify">{detail.name}</Heading>
        <Image src={detail.image} border="2px solid black" my={6} w="100%" h="400px" objectFit="cover" borderRadius="lg" boxShadow="lg" />
        <Text fontSize="xl" textAlign="justify">{detail.content}</Text>
      </Box>
    </Center>
  )
}

export default Detail
