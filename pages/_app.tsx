import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles.css'
import ChakraTheme from '../theme'
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={ChakraTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
