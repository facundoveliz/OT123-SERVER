import { extendTheme } from '@chakra-ui/react'
import '@fontsource/mali';

// this theme is only for example
const theme = extendTheme({
  colors: {
    brand: {
      red: '#DB5752',
      yellow: '#FAFA88',
      lightBlue: '#9AC9FB',
    },
  },
  fonts: {
    heading: 'Mali',
    body: 'Mali',
  },
})

export default theme;
