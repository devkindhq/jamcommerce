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
