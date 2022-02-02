import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AspectRatio, Image } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'

const Slider = ({ sliderData }) => { 
    return (
        <Carousel
        renderThumbs={() => false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        >
            {sliderData.map((item, index) => (
                <AspectRatio maxH='487px' maxW='1680px' ratio={16 / 9}>
                    <Image maxW='100%' maxH='100%' key={index} src={item.imgUrl} alt={item.text} />
                </AspectRatio>
            ))}
        </Carousel>
    )
}
export default Slider