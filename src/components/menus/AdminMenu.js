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
import { useSelector } from 'react-redux'
import { getUserData } from '../../app/slices/auth'
import LogoutButton from '../LogoutButton'

const AdminMenu = () => {
  const userData = useSelector(getUserData)
  const { id, firstName, lastName } = userData.payload.persistedReducer.userData.dataValues

  return (
    <Menu>
      <MenuButton as={Button} colorScheme="blue">
        { `${firstName} ${lastName}` }
      </MenuButton>
      <MenuList>
        <MenuGroup textAlign="center" fontWeight="black" title="Perfil">
          <MenuItem as={NavLink} to="/auth/perfil">Perfil</MenuItem>
          <MenuItem as={NavLink} to={`/auth/editarperfil/${id}`}>Editar perfil</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup textAlign="center" fontWeight="black" title="Administración">
          <MenuItem as={NavLink} to="/backoffice/actividades">Actividades</MenuItem>
          <MenuItem as={NavLink} to="/backoffice/categorias">Categorias</MenuItem>
          <MenuItem as={NavLink} to="/backoffice/contactos">Contactos</MenuItem>
          <MenuItem as={NavLink} to="/backoffice/testimonios">Testimonios</MenuItem>
          <MenuItem as={NavLink} to="/backoffice/novedades">Novedades</MenuItem>
          <MenuItem as={NavLink} to="/backoffice/home">Home</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem>
          <LogoutButton />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AdminMenu
