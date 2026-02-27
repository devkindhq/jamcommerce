// import '../utils/wdyr' // -- enable this to see why did you render.
import * as React from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles.css'
import ChakraTheme from '../theme'
import AppProvider from '../providers/app-provider'
import AuthProvider from '../providers/auth-provider'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <AppProvider>
        <ChakraProvider theme={ChakraTheme}>
          {/*** @ts-ignore */}
          <Component {...pageProps} />
        </ChakraProvider>
      </AppProvider>
    </AuthProvider>
  )
}

export default MyApp
