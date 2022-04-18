import React from 'react'
import PropTypes from 'prop-types'
import './Title.css'
import { Text } from '@chakra-ui/layout'

const Title = ({ title, fontSize }) => (
  <div className="paint-stroke animate__animated animate__rubberBand">
    <Text fontSize={fontSize} className="paint-text">{title}</Text>

  </div>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
}
Title.defaultProps = {
  fontSize: 25,
}
export default Title
