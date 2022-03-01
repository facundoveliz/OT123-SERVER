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
      <AspectRatio key={item.id} maxH="487px" width="100%" ratio={16 / 9}>
        <Image maxW="100%" maxH="100%" key={item.id} src={item.imageUrl} alt={item.text} />
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
