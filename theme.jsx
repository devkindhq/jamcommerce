import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { withProse } from '@nikolovlazar/chakra-ui-prose'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
const ChakraTheme = extendTheme({
  colors: {
    overcompiled: {
      100: "#123FFF"
    },
  },
  components: {
    Steps,
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
