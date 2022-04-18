import { Button } from '@chakra-ui/react';
import React from 'react';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { PropTypes } from 'prop-types'

const ButtonInfo = (props) => {
  const { children, nameIcon } = props;

  function icon() {
    switch (nameIcon) {
      case 'email':
        return <MdEmail color="#1970F1" size="20px" />
      case 'phone':
        return <MdPhone color="#1970F1" size="20px" />
      case 'location':
        return <MdLocationOn color="#1970F1" size="20px" />
      default:
        return null
    }
  }

  return (
    <Button
      size="md"
      height="48px"
      width="200px"
      variant="ghost"
      color="#DCE2FF"
      _hover={{ border: 'none' }}
      _active={{ border: 'none' }}
      leftIcon={icon()}
    >
      {children}
    </Button>
  )
}
ButtonInfo.propTypes = {
  children: PropTypes.element.isRequired,
  nameIcon: PropTypes.string.isRequired,
}

export default ButtonInfo;
