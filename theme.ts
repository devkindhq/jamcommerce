import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { withProse } from '@nikolovlazar/chakra-ui-prose'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}


const ChakraTheme = extendTheme({
  ...config,
  colors: {
    overcompiled: {
      100: "#123FFF"
    },
    yellow: {
      50: "#FEFAE7",
      100: "#FBF0BB",
      200: "#F9E790",
      300: "#F6DD65",
      400: "#F4D339",
      500: "#F1CA0E",
      600: "#C1A20B",
      700: "#917908",
      800: "#605106",
      900: "#302803"
    },
    blue: {
      50: "#EAF4FB",
      100: "#C3E1F4",
      200: "#9CCEEC",
      300: "#76BAE5",
      400: "#4FA7DE",
      500: "#2894D7",
      600: "#2076AC",
      700: "#185981",
      800: "#103B56",
      900: "#081E2B"
    }
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
