import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import {
  FaRegNewspaper, FaListUl, FaTasks, FaRegComments, FaUsers, FaBook, FaArrowsAltH,
} from 'react-icons/fa'
import Card from './Card';

const Index = () => (
  <Box backgroundColor="#f2f2f2">
    <Center display="flex" direction="row" flexWrap="wrap">
      <Card title="Novedades" icon={FaRegNewspaper} route="/backoffice/novedades" />
      <Card title="Actividades" icon={FaTasks} route="/backoffice/actividades" />
      <Card title="Categorias" icon={FaListUl} route="/backoffice/categorias" />
      <Card title="Testimonios" icon={FaRegComments} route="/backoffice/testimonios" />
      <Card title="Organización" icon={FaBook} route="" />
      <Card title="Slides" icon={FaArrowsAltH} route="" />
      <Card title="Usuarios" icon={FaUsers} route="/backoffice/usuarios" />
      <Card title="Miembros" icon={FaUsers} route="" />
    </Center>

  </Box>
);

export default Index;
