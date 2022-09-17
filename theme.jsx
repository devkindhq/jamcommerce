import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { withProse } from '@nikolovlazar/chakra-ui-prose'
const ChakraTheme = extendTheme({
  colors: {
    overcompiled: {
      100: "#123FFF"
    },
  },
}, withProse({
  baseStyle: 
    (props) => ({
      h2: {
        color: mode('gray.700', 'gray.100')(props)
      }
    })

  }
))

export default ChakraTheme
