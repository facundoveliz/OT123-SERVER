import React from 'react'
import AdminMenu from './AdminMenu'
import NormalMenu from './NormalMenu'

const Menu = (props) => {
  const { roleId } = props

  if (roleId === 1) {
    return <AdminMenu />
  }
  return <NormalMenu />
}

export default Menu
