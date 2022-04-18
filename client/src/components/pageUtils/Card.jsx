/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react'
import {
  GridItem, Text, Image, AspectRatio,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import imageNotFound from '../../assets/img/imageNotFound.jpg'

const Card = ({ array, direction }) => {
  const navigate = useNavigate()
  return (
    <>
      {array.map((item) => (
        <GridItem
          className=" animate__animated animate__zoomIn"
          border="2px solid black"
          backgroundColor="#ffffcc"
          key={item.id}
          w="350px"
          borderRadius="lg"
          boxShadow="lg"
          cursor="pointer"
          textAlign="justify"
          onClick={() => {
            navigate(`/${direction}/${item.id}`)
          }}
        >
          <Text
            fontSize="2xl"
            px={6}
            pt={3}
            pb={3}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {item.name}

          </Text>
          <Text
            px={6}
            pt={3}
            pb={3}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
          <Text
            px={6}
            pt={3}
            pb={3}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
          <AspectRatio maxW="400px" ratio={4 / 3}>

            <Image src={item.image.includes('http') ? item.image : imageNotFound} />
          </AspectRatio>
        </GridItem>
      ))}
    </>
  )
}
Card.propTypes = {
  direction: PropTypes.string.isRequired,
  array: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      content: PropTypes.string,
    }),
  ).isRequired,

}
export default Card
