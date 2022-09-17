import { Badge, Box, Button, Heading, HStack, Image, Text, useDisclosure, Progress, Flex, Stack, Spacer, useColorModeValue } from '@chakra-ui/react'
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
import CampaignCard from '../components/CampaignCard'
import banner from '../public/banner.png'
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
          <Box display="flex" gap={[4, 4, 0]} my={8} rounded={'xl'} shadow={'lg'} flexDirection={['column', 'column', 'row']} 
          bg={useColorModeValue('white', 'gray.700')}
          overflow="hidden">
            <Flex w={["auto", "auto", "75%"]}>
              <Image w="full"  h="full" src={banner.src}></Image>
            </Flex>
            <Box w={["auto", "auto", "25%"]} px={2} display="flex" alignItems="center" justifyContent="space-between" flexDirection="column">
              <Spacer />
                <Stack spacing={2} textAlign="center">
                  <Box>
                    <Heading color={useColorModeValue('gray.700', 'gray.100')}>{donationDetails && formatAmountForDisplay(donationDetails.destination_currency_total, 'AUD')}</Heading>
                    <Text color={useColorModeValue('gray.500', 'gray.400')}> Funded of {''}{formatAmountForDisplay(2000, 'AUD')}{' '}</Text>
                  </Box>
                  {donationDetails && <Progress rounded={'lg'} size={'md'} colorScheme='green' value={(donationDetails.destination_currency_total/2000)*100} />}
                  <HStack pt={2}>
                    <Badge>{donationDetails && donationDetails.total_transactions} supporters</Badge>
                    <Badge>14 days left</Badge>
                    {/** TODO: Write a function to determine how many days left */}
                  </HStack>
                  <Box py={4} w="full">
                  <Button w="full" size={'lg'} shadow="md" onClick={onOpen} colorScheme='green' textTransform={'uppercase'}   variant="solid"    _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}>Support 🙏</Button>
                    <Text mt={2} color={useColorModeValue('gray.600', 'gray.300')} fontSize="xs">Safe checkout with Stripe</Text>
                  </Box>
                </Stack>
                <Spacer />
                <Box mb={6} p={2} textAlign="center">
                  <Text fontSize="sm"> <strong>Partial Funding</strong> this campaign will collect all funds raised by Oct 1, 2022 8:45 AM.</Text>
                </Box>
            </Box>
            <LevelModal isOpen={isOpen} onClose={onClose} />
          </Box>

        <Flex  flexDirection={['column', 'column', 'row']} gap={12} my={12}>
          <Box w={["auto", "auto", "70%"]}>
            <CampaignCard {...{
              index: 2,
              title: 'Campaign Objective',
              content:
                "Pakistan's Sindh Province has been the hardest hit with almost 15 million people homeless and half of the province underwater. We request everyone to join hands",
            }} />
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