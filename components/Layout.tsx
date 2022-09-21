import { Box, useBreakpointValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

import Footer from './Footer'
import Head from './Head'
import Header from './Header'

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({
  children,
  title = 'Regional Sindh Emergency Flood Relief 2022',
}: Props) => (
  <>
    <Head title={title} />
    <Header />
    <Box pt={useBreakpointValue({base: '0px', md: '100px'})}>
      {children}
    </Box>
    <Footer />
</>
 
)

export default Layout
