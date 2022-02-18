import React from 'react'
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

const NormalMenu = () => (
  <Menu>
    <MenuButton as={Button} colorScheme="blue">
      Cuenta
    </MenuButton>
    <MenuList>
      <MenuGroup title="Perfil">
        <MenuItem as={NavLink} to="/auth/perfil">Perfil</MenuItem>
        <MenuItem as={NavLink} to="/auth/editarperfil">Editar perfil</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuItem>Cerrar sesión</MenuItem>
    </MenuList>
  </Menu>
)

export default NormalMenu
