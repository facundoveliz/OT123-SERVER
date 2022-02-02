import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AspectRatio, Image } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'

const Slider = () => {
    const sliderData =  [
        { 
            imgUrl: './images/slider-01.jpg', text: 'ONG 1' 
        },
        { 
            imgUrl: '/images/slider-02.jpg', text: 'ONG 2' 
        },
        { 
            imgUrl: '/images/slider-03.jpg', text: 'ONG 3' 
        },
    ]   
    return (
        <Carousel
        renderThumbs={() => false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        >
            {sliderData.map((item, index) => (
                <AspectRatio maxH='487px' maxW='1680px' ratio={16 / 9}>
                    <Image maxW='100%' maxH='100%' key={index} src={item.imgUrl} alt='item.text' />
                </AspectRatio>
            ))}
        </Carousel>
    )
}
export default Slider