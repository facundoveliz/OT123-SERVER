import React from 'react';
import { Center } from '@chakra-ui/react';
import {
  FaRegNewspaper, FaListUl, FaTasks, FaRegComments, FaUsers, FaBook, FaArrowsAltH,
} from 'react-icons/fa'
import Card from './Card';

const Index = () => (
  <Center display="flex" direction="row" flexWrap="wrap">
    <Card title="Novedades" icon={FaRegNewspaper} />
    <Card title="Actividades" icon={FaTasks} />
    <Card title="Categorias" icon={FaListUl} />
    <Card title="Testimonios" icon={FaRegComments} />
    <Card title="Organización" icon={FaBook} />
    <Card title="Slides" icon={FaArrowsAltH} />
    <Card title="Usuarios" icon={FaUsers} />
    <Card title="Miembros" icon={FaUsers} />
  </Center>
);

export default Index;
