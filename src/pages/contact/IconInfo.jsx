import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { BsInstagram } from 'react-icons/bs';
import { MdFacebook } from 'react-icons/md';
import { PropTypes } from 'prop-types'

const IconInfo = (props) => {
  const { nameIcon } = props;
  function icon() {
    switch (nameIcon) {
      case 'facebook':
        return <MdFacebook color="#1970F1" size="20px" />
      case 'instagram':
        return <BsInstagram color="#1970F1" size="20px" />
      default:
        return null
    }
  }
  return (
    <IconButton
      variant="ghost"
      isRound
      _hover={{ bg: '#0D74FF' }}
      icon={icon()}
    />
  )
}

IconInfo.propTypes = {
  nameIcon: PropTypes.string.isRequired,
}

export default IconInfo;
