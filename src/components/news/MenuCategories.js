/* eslint-disable no-console */
import {
  Menu, MenuButton, MenuList, Button,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { IoChevronDownCircleOutline } from 'react-icons/io5'
import { getAllCategories } from '../../services/categoriesService'
import ItemMenu from './ItemMenu'

const MenuCategories = () => {
  const [allCategories, setAllCategories] = useState([])
  const loadCategoriesData = async () => {
    const loadedCategoryData = await getAllCategories()
    setAllCategories(loadedCategoryData.data?.result.categories)
  }

  useEffect(() => {
    loadCategoriesData()
  }, [])

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
        Categorias
      </MenuButton>
      <MenuList>
        {allCategories.map((item) => (
          <ItemMenu key={item.id} item={item} />
        ))}
      </MenuList>
    </Menu>
  )
}
export default MenuCategories
