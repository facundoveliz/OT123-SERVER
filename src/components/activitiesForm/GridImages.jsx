import { FormLabel } from '@chakra-ui/form-control'
import { Grid, GridItem } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'

const GridImages = ({
  id, name, oldImage, loadImage,
}) => (
  <Grid templateColumns="repeat(2, 1fr)" gap={5}>
    <GridItem w="100%" h="100%">

      { id
    && (
    <>
      <FormLabel textAlign="center">Imagen actual</FormLabel>
      <Image alt={name} objectFit="cover" src={oldImage} />
    </>
    )}

    </GridItem>
    <GridItem w="100%" h="100%">
      {
      loadImage !== null
      && (
      <>
        <FormLabel textAlign="center">Nueva imagen</FormLabel>
        <Image alt={name} objectFit="cover" src={loadImage} />
      </>
      )
      }

    </GridItem>
  </Grid>
)
GridImages.propTypes = {
  name: PropTypes.string,
  loadImage: PropTypes.string,
  id: PropTypes.number,
  oldImage: PropTypes.string,
}

GridImages.defaultProps = {
  oldImage: '',
  name: '',
  loadImage: '',
  id: null,
}
export default GridImages
