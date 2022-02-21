import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'
import LogoutButton from '../LogoutButton'

const NormalMenu = (props) => {
  const { id } = props

  return (
    <Menu>
      <MenuButton as={Button} colorScheme="blue">
        Cuenta
      </MenuButton>
      <MenuList>
        <MenuGroup title="Perfil">
          <MenuItem as={NavLink} to="/auth/perfil">Perfil</MenuItem>
          <MenuItem as={NavLink} to={`/auth/editarperfil/${id}`}>Editar perfil</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem>
          <LogoutButton />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

NormalMenu.propTypes = {
  id: PropTypes.number.isRequired,
}

export default NormalMenu
