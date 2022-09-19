import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import PrintObject from '../components/PrintObject'
import Cart from '../components/Cart'
import ClearCart from '../components/ClearCart'

import { fetchGetJSON } from '../utils/api-helpers'
import useSWR from 'swr'
import { CheckCircleIcon, CheckIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, Heading, Image, Spacer, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import { formatAmountForDisplay } from '../utils/stripe-helpers'
import { useContext } from 'react'
import AppContext from '../context/app-context'
import ticket from '../public/ticket.svg';
import CampaignCard from '../components/CampaignCard'
import TransactionCard from '../components/TransactionCard'

const ResultPage: NextPage = () => {
  const router = useRouter()
  const app = useContext(AppContext);
  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  )
  const isLoading = !data;
  if (error) return <div>failed to load</div>

  return (
    <Layout title="Thank you - Your donations have been received">
        <Flex  direction="column" alignContent={'center'} alignItems='center' textAlign={"center"} w="full" justifyContent={'space-around'} mx="auto" maxW="6xl" gridGap={2} py={14} mt={14} color={useColorModeValue("gray.800", "gray.100")} minH={['auto', 'auto', '80vh']} align={'center'} justify="center" justifyItems={'center'} justifySelf='center' alignSelf={'center'}>
        <Box rounded="full" p={8}  borderWidth={1}  bg={useColorModeValue("green.100","green.900")}><CheckIcon fontSize={'7xl'} color={useColorModeValue("green.700","green.100")}/></Box>
        <Box mb={16}>
        <Heading color={useColorModeValue("gray.700","white")}>Thank you for your kindness</Heading>
        <Text fontSize="xl" mt={2}>Your donations have successfully been received. <br /> Please find your transaction details below.</Text>
        </Box>
        {isLoading ? (<Spinner size="xl" />):
                <TransactionCard title={"Transaction details"} index={5}>
                <Box>
                <Flex gap={4} justifyContent={'space-between'}>
                <Box>
                  <Text fontSize="lg"  fontWeight={'semibold'}>Name</Text>
                  <Text color={useColorModeValue("gray.800", "gray.100")}>{data?.customer_details.name}</Text>
                </Box>
                <Box textAlign={'right'}>
                  <Text fontSize="lg"  fontWeight={'semibold'}>Amount</Text>
                  <Text color={useColorModeValue("gray.800", "gray.100")}>{formatAmountForDisplay(data?.amount_total/100, data?.currency)}</Text>
                </Box>
                </Flex>
                <Flex gap={4} mt={4} justifyContent={'space-between'}>
                <Box>
                  <Text fontSize="lg"  fontWeight={'semibold'}>Date</Text>
                  <Text color={useColorModeValue("gray.800", "gray.100")} fontSize="md">{new Date(data?.payment_intent.created * 1000).toDateString()} {data?.created}</Text>
                  <Text color={useColorModeValue("gray.800", "gray.100")} fontSize="md">{new Date(data?.payment_intent.created * 1000).toLocaleTimeString()} {data?.created}</Text>
                </Box>
                <Box  textAlign={'right'}>
                  <Text fontSize="lg"  fontWeight={'semibold'}>Payment method</Text>
                  <Text textTransform={'capitalize'} color={useColorModeValue("gray.800", "gray.100")}>{data?.payment_method_types}</Text>
                </Box>
                </Flex>
                <Flex gap={4} mt={4} justifyContent={'space-between'} w="full">
                <Box>
                  <Text  fontWeight={'semibold'} fontSize="lg">Transaction code</Text>
                  <Text color={useColorModeValue("gray.800", "gray.100")} fontSize="md">{data?.payment_intent?.id}</Text>
                </Box>
                </Flex>
                </Box>
                </TransactionCard>}
   
        <Spacer />
        </Flex>
{/*    
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? 'loading...'} />
        <Cart>
          <ClearCart />
        </Cart> */}

    </Layout>
  )
}

export default ResultPage
