import React, { ReactNode } from 'react'

import Link from 'next/link'
import { Box } from '@chakra-ui/react'
import Footer from './Footer'
import Header from './Header'
import Head from './Head'

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({
  children,
  title = 'TypeScript Next.js Stripe Example',
}: Props) => (
  <>
    <Head title={title} />
    <Header />
      {children}
    <Footer />
</>
 
)

export default Layout
