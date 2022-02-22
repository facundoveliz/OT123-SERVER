import React from 'react';
import { Center } from '@chakra-ui/react';
import {
  FaRegNewspaper, FaListUl, FaTasks, FaRegComments, FaUsers, FaBook, FaArrowsAltH,
} from 'react-icons/fa'
import Card from './Card';

const Index = () => (
  <Center display="flex" direction="row" flexWrap="wrap">
    <Card title="Novedades" icon={FaRegNewspaper} route="" />
    <Card title="Actividades" icon={FaTasks} route="/actividades" />
    <Card title="Categorias" icon={FaListUl} route="/categorias" />
    <Card title="Testimonios" icon={FaRegComments} route="/testimonios" />
    <Card title="Organización" icon={FaBook} route="" />
    <Card title="Slides" icon={FaArrowsAltH} route="" />
    <Card title="Usuarios" icon={FaUsers} route="" />
    <Card title="Miembros" icon={FaUsers} route="" />
  </Center>
);

export default Index;
