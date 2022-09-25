import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'

import { CheckIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Spacer, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import useSWR from 'swr'
import TransactionCard from '../components/TransactionCard'
import { fetchGetJSON } from '../utils/api-helpers'
import { formatAmountForDisplay } from '../utils/stripe-helpers'

const ResultPage: NextPage = () => {
  const router = useRouter()
  const textColor = useColorModeValue("gray.800", "gray.100");
  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  )
  const isLoading = !data;

  return (
    <Layout title="Thank you - Your donations have been received">
      <Box maxW={'5xl'} mx="auto">
      <Flex direction="column" alignContent={'center'} alignItems='center' textAlign={"center"} w="full" justifyContent={'space-around'} mx="auto" maxW="6xl" gridGap={2} py={14} mt={14} color={textColor}  align={'center'} justify="center" justifyItems={'center'} justifySelf='center' alignSelf={'center'}>
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
                  <Text color={textColor}>{data?.customer_details?.name}</Text>
                </Box>
                <Box textAlign={'right'}>
                  <Text fontSize="lg"  fontWeight={'semibold'}>Amount</Text>
                  <Text color={textColor}>{formatAmountForDisplay(data?.amount_total/100, data?.currency)}</Text>
                </Box>
                </Flex>
                <Flex gap={4} mt={4} justifyContent={'space-between'}>
                <Box>
                  <Text fontSize="lg"  fontWeight={'semibold'}>Date</Text>
                  <Text color={textColor} fontSize="md">{new Date(data?.payment_intent.created * 1000).toDateString()} {data?.created}</Text>
                  <Text color={textColor} fontSize="md">{new Date(data?.payment_intent.created * 1000).toLocaleTimeString()} {data?.created}</Text>
                </Box>
                <Box  textAlign={'right'}>
                  <Text fontSize="lg"  fontWeight={'semibold'}>Payment method</Text>
                  <Text textTransform={'capitalize'} color={textColor}>{data?.payment_method_types}</Text>
                </Box>
                </Flex>
                <Flex gap={4} mt={4} justifyContent={'space-between'} w="full">
                <Box>
                  <Text  fontWeight={'semibold'} fontSize="lg">Transaction code</Text>
                  <Text color={textColor} fontSize="md">{data?.payment_intent?.id}</Text>
                </Box>
                </Flex>
                </Box>
                </TransactionCard>}
   
        <Spacer />
      </Flex>
      </Box>
    </Layout>
  )
}

export default ResultPage
