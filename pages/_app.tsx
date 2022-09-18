import * as React from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles.css'
import ChakraTheme from '../theme'
import AppProvider from '../providers/app-provider'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AppProvider>
      <ChakraProvider theme={ChakraTheme}>
        {/*** @ts-ignore */}
        <Component {...pageProps} />
      </ChakraProvider>
    </AppProvider>
  )
}

export default MyApp
