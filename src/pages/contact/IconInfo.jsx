import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { BsInstagram } from 'react-icons/bs';
import {  MdFacebook } from 'react-icons/md';
import { PropTypes } from 'prop-types'

function IconInfo(props) {
    const { nameIcon} = props;
  return <IconButton
  variant="ghost"
  isRound
  _hover={{ bg: '#0D74FF' }}
  icon={
  nameIcon === 'facebook' &&
  <MdFacebook color="#1970F1" size="20px" />
  ||
  nameIcon === 'instagram' &&
  <BsInstagram color="#1970F1" size="20px" />  
  }
/>
 }

 IconInfo.propTypes = {
  nameIcon: PropTypes.string.isRequired,
}


export default IconInfo;
