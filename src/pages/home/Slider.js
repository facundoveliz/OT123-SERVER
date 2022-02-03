import React from 'react'
import PropTypes from 'prop-types'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { AspectRatio, Image } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'

const Slider = ({ sliderData }) => (
  <Carousel
    renderThumbs={() => false}
    showStatus={false}
    autoPlay
    infiniteLoop
  >
    {sliderData.map((item) => (
      <AspectRatio maxH="487px" maxW="1680px" ratio={16 / 9}>
        <Image maxW="100%" maxH="100%" key={item.id} src={item.imgUrl} alt={item.text} />
      </AspectRatio>
    ))}
  </Carousel>
)

Slider.propTypes = {
  sliderData: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
}

export default Slider
