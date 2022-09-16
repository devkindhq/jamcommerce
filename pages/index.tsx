import { Badge, Box, Button, Heading, HStack, Image, Text, useDisclosure } from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import LevelModal from '../components/LevelModal'
import { fetchGetJSON } from '../utils/api-helpers'
import { useEffect, useState } from 'react'

const IndexPage: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currrencies, setCurrencies] = useState<null>(null)
  useEffect(() => {
    fetchGetJSON('/api/currency')
    .then((data) => {
      setCurrencies(data)
    })
  }, [])
 

  return (
      <Layout title="Home | Next.js + TypeScript Example">
        <Box maxW={"7xl"} mx="auto">
          <Box display="flex" justifyContent="center">
            <Heading>Purpose of this Campaign Head</Heading>
          </Box>
          <Box display="flex" gap={4} py={8}>
            <Box w="75%">
              <Image w="full" rounded="lg" h="full" src="https://s3.amazonaws.com/launchgood/project%2F128769%2Fclean_water_for_yemen_LG+3-700x525.jpeg"></Image>
            </Box>
            <Box w="25%" display="flex" alignItems="center" justifyContent="space-between" flexDirection="column">
                <h1>Product Name</h1>
                <Box textAlign="center">
                  <Heading>$39,187</Heading>
                  <Text> Funded of $50,000 USD</Text>
                  <HStack>
                    <Badge>1108 supporters</Badge>
                    <Badge>14 days left</Badge>
                  </HStack>
                  <Box py={4} w="full">
                <Button px={12} w="full" onClick={onOpen} rounded="full" py={6} variant="solid">Support</Button>
                    <Text fontSize="xs">Verified for authenticity and Learn more</Text>
                  </Box>
                </Box>
                <Box p={2} textAlign="center">
                  <Text fontSize="sm"> Partial Funding  this campaign will collect all funds raised by Oct 1, 2022 8:45 AM.</Text>
                </Box>
            </Box>
            <LevelModal isOpen={isOpen} onClose={onClose} />
          </Box>

        </Box>
        {/* <ul className="card-list">
          <li>
            <Link href="/donate-with-checkout">
              <a className="card checkout-style-background">
                <h2 className="bottom">Donate with Checkout</h2>
                <img src="/checkout-one-time-payments.svg" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/donate-with-elements">
              <a className="card elements-style-background">
                <h2 className="bottom">Donate with Elements</h2>
                <img src="/elements-card-payment.svg" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/use-shopping-cart">
              <a className="card cart-style-background">
                <h2 className="bottom">Use Shopping Cart</h2>
                <img src="/use-shopping-cart.png" />
              </a>
            </Link>
          </li>
        </ul> */}
      </Layout>
  )
}

export default IndexPage
