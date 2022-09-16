import { extendTheme } from '@chakra-ui/react'
import { withProse } from '@nikolovlazar/chakra-ui-prose'
const ChakraTheme = extendTheme({
  colors: {
    overcompiled: {
      100: "#123FFF"
    },
  },
}, withProse({
  baseStyle: {
    h2: {
      color: 'gray.700'
    }
  }
}))

export default ChakraTheme
