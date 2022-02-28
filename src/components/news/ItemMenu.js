/* eslint-disable no-console */
import { MenuItem } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setCategoryData } from '../../app/slices/category';

const ItemMenu = ({ item }) => {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(setCategoryData(item))
  }
  return (
    <MenuItem onClick={onClick}>{item.name}</MenuItem>
  )
}

ItemMenu.propTypes = {
  item:
  PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string,
    updatedAt: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
}

export default ItemMenu
