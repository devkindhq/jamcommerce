import { Box } from '@chakra-ui/react'
import NextHead from 'next/head'
import { ReactNode } from 'react'
import MarketingFooter from './MarketingFooter'
import MarketingHeader from './MarketingHeader'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  ogImage?: string
}

export default function MarketingLayout({
  children,
  title = 'JamCommerce — The fundraising platform built for the whole world',
  description = 'Launch a fundraising campaign in minutes. Accept donations in any currency. Built on Stripe. Open source and self-hostable.',
  ogImage = '/social_card.png',
}: Props) {
  return (
    <>
      <NextHead>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="JamCommerce" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </NextHead>
      <MarketingHeader />
      <Box as="main">
        {children}
      </Box>
      <MarketingFooter />
    </>
  )
}
