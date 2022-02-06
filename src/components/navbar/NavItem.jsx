import React from 'react';
import PropTypes from 'prop-types'
import { Box, Text } from '@chakra-ui/react';

const NavItem = ({ text }) => (
  <Box>
    <Text fontSize="2xl" p="12px" borderRadius="lg">{text}</Text>
  </Box>
);

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
}

export default NavItem;
