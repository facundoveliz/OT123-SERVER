import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import {
  Box, Center, ListItem, Text, UnorderedList,
} from '@chakra-ui/layout'
import { Collapse, useDisclosure } from '@chakra-ui/react'
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
                Name:
              </Text>
              {item.name }
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Teléfono:
              </Text>
              {item.phone }
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Mensaje:
              </Text>
              <Text
                fontSize="xl"
                textAlign="justify"
                dangerouslySetInnerHTML={{ __html: item.message }}
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
      email: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      message: PropTypes.string,
    }).isRequired,
}
export default ItemCollapse
