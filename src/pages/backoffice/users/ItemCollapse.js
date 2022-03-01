import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import {
  Box, Center, ListItem, Text, UnorderedList,
} from '@chakra-ui/layout'
import { Collapse, Image, useDisclosure } from '@chakra-ui/react'
import { IoArrowDownOutline } from 'react-icons/io5'
import PropTypes from 'prop-types'

const ItemCollapse = ({ item }) => {
  const { isOpen, onToggle } = useDisclosure()
  const [openCollapse, setopenCollapse] = useState(false)

  return (
    <>
      <Box
        textAlign="center"
      >
        <Button
          w="100%"
          border="2px solid black"
          onClick={() => { onToggle(); setopenCollapse(!openCollapse) }}
        >
          {item.email}
        </Button>
      </Box>
      {openCollapse
      && (
      <Center>
        <IoArrowDownOutline size="25" />
      </Center>
      )}
      <Collapse startingHeight={5} in={isOpen} animateOpacity>
        <Box
          border="2px solid black"
          marginBottom="8"
          p="20px"
          color="white"
          mt="4"
          bg="#d6f5d6"
          rounded="md"
          shadow="md"
        >
          <UnorderedList key={item.id} color="black">
            <ListItem>
              <Text fontWeight="bold">
                Nombre:
              </Text>
              {item.firstName }
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Apellido:
              </Text>
              {item.lastName }
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Email:
              </Text>
              {item.email }
            </ListItem>
            <ListItem onClick={() => window.open(item.image)} cursor="pointer">
              <Text fontWeight="bold">
                Foto de Perfil:
              </Text>
              <Image
                width={60}
                src={item.image}
                borderRadius="2xl"
                border="2px solid"
                my={5}
              />
            </ListItem>
          </UnorderedList>
        </Box>
      </Collapse>
    </>
  )
}
ItemCollapse.propTypes = {
  item:
    PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      image: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
}

export default ItemCollapse
