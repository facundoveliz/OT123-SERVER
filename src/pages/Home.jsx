import React from 'react'
import { Img, Text } from '@chakra-ui/react'
import Header from '../components/navbar/Header'
import Footer from '../components/Footer'

const Home = () => (
<<<<<<< HEAD
  <main className="flex justify-center items-center w-screen h-screen">
    <h1>Home</h1>
  </main>
=======
  <>
    <Header />
    <Img src="/ong-pics/Foto1.jpg" w="100%" h="60vh" objectFit="cover" />
    <Text textAlign="center" fontSize="3xl" my={5}>Texto de Bienvenida</Text>
    <Text textAlign="center" fontSize="2xl" mb={2}>Últimas novedades</Text>
    <Text textAlign="center" fontSize="2xl">Testimonios</Text>
    <Footer />
  </>
>>>>>>> f917ea87872ef9a41e0d503c05369da02788f322
)

export default Home
