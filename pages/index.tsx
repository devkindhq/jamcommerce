import { Badge, Box, Button, Heading, HStack, Image, Text, useDisclosure, Progress, Flex, Stack, Spacer } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import CheckoutForm from '../components/CheckoutForm'
import Layout from '../components/Layout'
import LevelModal from '../components/LevelModal'
import ProductsNew from '../components/ProductsNew'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import { formatAmountForDisplay } from '../utils/stripe-helpers'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import description from '../data/donation_description'

const IndexPage: NextPage = ({source}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currrencies, setCurrencies] = useState<null>(null)
  const [donationDetails, setDonationDetails] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true);
    fetch('/api/donation_details?destination_currency=AUD')
    .then(response => response.json())
    .then( e => {
      setDonationDetails(e)
    }).finally(() => setLoading(false));
  },[]);
  

  return (
      <Layout title="Home | Next.js + TypeScript Example">
        <Box maxW={"7xl"} mx="auto" px={4}>
          <Box display="flex" justifyContent="center">
            <Heading color="gray.700">Purpose of this Campaign Head</Heading>
          </Box>
          <Box display="flex" gap={4} my={8} rounded={'xl'} shadow={'lg'} flexDirection={['column', 'column', 'row']} overflow="hidden">
            <Flex w={["auto", "auto", "75%"]}>
              <Image w="full"  h="full" src="https://s3.amazonaws.com/launchgood/project%2F128769%2Fclean_water_for_yemen_LG+3-700x525.jpeg"></Image>
            </Flex>
            <Box w={["auto", "auto", "25%"]} display="flex" alignItems="center" justifyContent="space-between" flexDirection="column">
              <Spacer />
                <Stack spacing={2} textAlign="center">
                <Heading color='gray.700'>{donationDetails && formatAmountForDisplay(donationDetails.destination_currency_total, 'AUD')}</Heading>
                  <Text color='gray.500'> Funded of {''}{formatAmountForDisplay(2000, 'AUD')}{' '}</Text>
                  {donationDetails && <Progress rounded={'md'} colorScheme='teal' height='32px' value={(donationDetails.destination_currency_total/2000)*100} />}
                  <HStack>
                    <Badge>{donationDetails && donationDetails.total_transactions} supporters</Badge>
                    <Badge>14 days left</Badge>
                    {/** TODO: Write a function to determine how many days left */}
                  </HStack>
                  <Box py={4} w="full">
                  <Button px={12} w="full" onClick={onOpen} colorScheme='green' textTransform={'uppercase'} rounded="full" py={6} variant="solid">Support</Button>
                    <Text mt={2} color='gray.600' fontSize="xs">Safe checkout with Stripe</Text>
                  </Box>
                </Stack>
                <Spacer />
                <Box mb={6} p={2} textAlign="center">
                  <Text fontSize="sm"> <strong>Partial Funding</strong> this campaign will collect all funds raised by Oct 1, 2022 8:45 AM.</Text>
                </Box>
            </Box>
            <LevelModal isOpen={isOpen} onClose={onClose} />
          </Box>

        <Flex  flexDirection={['column', 'column', 'row']}>
          <Box w={["auto", "auto", "70%"]} px={6}>
            <Prose>
            <MDXRemote {...source}  />
            </Prose>
          </Box>
          <Box w={["auto", "auto", "30%"]}><CheckoutForm /></Box>
        </Flex>
        </Box>
      </Layout>
  )
}

export default IndexPage

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  
  const mdxSource = await serialize(description)
  return { props: { source: mdxSource } }
}