import React from 'react'
import PropTypes from 'prop-types';
import AdminMenu from './AdminMenu'
import NormalMenu from './NormalMenu'

const Menu = (props) => {
  const { id } = props
  const { roleId } = props

  if (roleId === 1) {
    return <AdminMenu id={id} />
  }
  return <NormalMenu id={id} />
}

Menu.propTypes = {
  id: PropTypes.number.isRequired,
  roleId: PropTypes.number.isRequired,
}

export default Menu
