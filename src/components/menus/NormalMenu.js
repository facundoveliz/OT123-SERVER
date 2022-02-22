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
import LogoutButton from '../LogoutButton'

const NormalMenu = () => (
  <Menu>
    <MenuButton as={Button} colorScheme="blue">
      Cuenta
    </MenuButton>
    <MenuList>
      <MenuGroup textAlign="center" fontWeight="black" title="Perfil">
        <MenuItem as={NavLink} to="/auth/perfil">Perfil</MenuItem>
        <MenuItem as={NavLink} to="/auth/editarperfil">Editar perfil</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuItem>
        {' '}
        <LogoutButton />
      </MenuItem>
    </MenuList>
  </Menu>
)

export default NormalMenu
