import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Box } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({
  children,
  title = 'TypeScript Next.js Stripe Example',
}: Props) => (
  <Box maxW={"7xl"} mx="auto">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thorwebdev" />
      <meta name="twitter:title" content="TypeScript Next.js Stripe Example" />
      <meta
        name="twitter:description"
        content="Full-stack TypeScript example using Next.js, react-stripe-js, and stripe-node."
      />
      <meta
        name="twitter:image"
        content="https://nextjs-typescript-react-stripe-js.vercel.app/social_card.png"
      />
    </Head>
    <Box>

      <header>
        <div className="header-content">
          <Link href="/">
            <a className="logo">
              <img src="/logo.png" />
            </a>
          </Link>
          <h1>
            <span className="light">Stripe Sample</span>
            <br />
            Next.js, TypeScript, and Stripe 🔒💸
          </h1>
        </div>
      </header>
      {children}
    </Box>
   
  </Box>
)

export default Layout
