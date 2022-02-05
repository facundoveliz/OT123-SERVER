import React from 'react';
import PropTypes from 'prop-types'

import {
  VStack, Text, Icon, Button,
} from '@chakra-ui/react';

const Card = ({ title, icon }) => (
  <VStack spacing={6} p={6} minW="300px" m={8} boxShadow="lg" borderRadius="lg" borderWidth={1} direction="column">
    <Text fontSize="3xl">{title}</Text>
    <Icon cursor="pointer" as={icon} w={24} h={24} />
    <Button colorScheme="green">Ir</Button>
  </VStack>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
}

export default Card;
