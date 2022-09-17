import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles.css'
import ChakraTheme from '../theme'
import { CurrencyProvider } from '../context/currency-context'
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <CurrencyProvider>
      <ChakraProvider theme={ChakraTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </CurrencyProvider>
  )
}

export default MyApp
