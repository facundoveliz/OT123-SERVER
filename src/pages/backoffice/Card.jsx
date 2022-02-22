import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import {
  VStack, Text, Icon, Button,
} from '@chakra-ui/react';

const Card = ({ title, icon, route }) => (
  <VStack spacing={6} p={6} minW="300px" m={8} boxShadow="lg" borderRadius="lg" borderWidth={1} direction="column">
    <Text fontSize="3xl">{title}</Text>
    <Icon cursor="pointer" as={icon} w={24} h={24} />
    {/* temporary comment for knowing what routes are missing */}
    {route ? (
      <Button colorScheme="green" as={Link} to={route}>Ir</Button>
    ) : (
      <Button colorScheme="green" isDisabled="true">Ir</Button>)}
  </VStack>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
}

export default Card;
