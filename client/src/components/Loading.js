import React from 'react'
import { Spinner } from '@chakra-ui/react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prop-types
const Loading = ({ active, children }) => {
  if (active) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  }
  return (

    { children }

  )
}
Loading.propTypes = {
  active: PropTypes.bool.isRequired,
}
export default Loading
