import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/button'
import {
  Box, Center, ListItem, Text, UnorderedList,
} from '@chakra-ui/layout'
import { Collapse, Image, useDisclosure } from '@chakra-ui/react'
import { IoArrowDownOutline, IoPencil } from 'react-icons/io5'

const ItemCollapse = ({ slide }) => {
  const navigate = useNavigate()
  const { isOpen, onToggle } = useDisclosure()
  const [openCollapse, setopenCollapse] = useState(false)

  return (
    <>
      <Box
        key={slide.id}
        textAlign="center"
      >
        <Button
          w="100%"
          border="2px solid black"
          onClick={() => { onToggle(); setopenCollapse(!openCollapse) }}
        >
          {`Slide ${slide.id}`}
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
          <UnorderedList key={slide.id} color="black">
            <ListItem>
              <Text fontWeight="bold">
                Contentido:
              </Text>
              {slide.text}
            </ListItem>
            <ListItem onClick={() => window.open(slide.imageUrl)} cursor="pointer">
              <Text fontWeight="bold">
                Imagen:
              </Text>
              <Image
                width={60}
                maxW="300px"
                src={slide.imageUrl}
                borderRadius="2xl"
                border="2px solid"
                my={5}
              />
            </ListItem>
          </UnorderedList>
          <Box
            paddingTop="4"
            textAlign="center"
            color="black"
            justifyContent="center"
            display="flex"
            width="100%"
          >
            <Button
              border="2px solid black"
              leftIcon={<IoPencil />}
              marginBottom="1"
              backgroundColor="#ccebff"
              _hover={{
                backgroundColor: '#4db8ff',
              }}
              onClick={() => navigate(`slide/${slide.id}`)}
            >
              Editar
            </Button>
          </Box>
        </Box>
      </Collapse>
    </>
  )
}

ItemCollapse.propTypes = {
  slide: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    }),
  ).isRequired,
}
export default ItemCollapse
