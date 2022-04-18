import React from 'react'
import PropTypes from 'prop-types';
import AdminMenu from './AdminMenu'
import NormalMenu from './NormalMenu'

const Menu = (props) => {
  const { roleId } = props

  if (roleId === 1) {
    return <AdminMenu />
  }
  return <NormalMenu />
}

Menu.propTypes = {
  roleId: PropTypes.number.isRequired,
}

export default Menu
