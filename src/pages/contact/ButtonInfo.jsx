import { Button } from '@chakra-ui/react';
import React from 'react';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { PropTypes } from 'prop-types'

function ButtonInfo(props) {
    const {children, nameIcon} = props;
  return <Button
  size="md"
  height="48px"
  width="200px"
  variant="ghost"
  color="#DCE2FF"
  _hover={{ border: 'none' }}
  _active={{ border: 'none' }}
  leftIcon={
  nameIcon === 'email' &&
  <MdEmail color="#1970F1" size="20px" />
  ||
  nameIcon === 'phone' &&
  <MdPhone color="#1970F1" size="20px" />
  ||
  nameIcon === 'location' &&
  <MdLocationOn color="#1970F1" size="20px" />
  
  }
>
    {children}
    </Button>
}
ButtonInfo.propTypes = {
    children: PropTypes.element.isRequired,
    nameIcon: PropTypes.string.isRequired,
  }
  

export default ButtonInfo;
