import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles.css'
import ChakraTheme from '../theme'
import { CurrencyProvider } from '../context/currency-context'
import AppProvider from '../providers/app-provider'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AppProvider>
    <CurrencyProvider>
      <ChakraProvider theme={ChakraTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </CurrencyProvider>
    </AppProvider>
  )
}

export default MyApp
