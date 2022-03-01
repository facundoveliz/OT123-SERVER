import React from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';
import {
  FaRegNewspaper, FaListUl, FaTasks, FaRegComments, FaUsers, FaHome,
} from 'react-icons/fa'
import Card from './Card';

const Index = () => (
  <Box backgroundColor="#f2f2f2">
    <Heading textAlign="center" pt={7}>Backoffice</Heading>
    <Center display="flex" direction="row" flexWrap="wrap">
      <Card title="Novedades" icon={FaRegNewspaper} route="/backoffice/novedades" />
      <Card title="Actividades" icon={FaTasks} route="/backoffice/actividades" />
      <Card title="Categorias" icon={FaListUl} route="/backoffice/categorias" />
      <Card title="Testimonios" icon={FaRegComments} route="/backoffice/testimonios" />
      <Card title="Home" icon={FaHome} route="/backoffice/home" />
      <Card title="Usuarios" icon={FaUsers} route="/backoffice/usuarios" />
      <Card title="Miembros" icon={FaUsers} route="/backoffice/miembros" />
    </Center>

  </Box>
);

export default Index;
