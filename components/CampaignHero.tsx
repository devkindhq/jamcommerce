import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Progress,
  Skeleton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import getStripe from '../utils/get-stripejs'
import { formatAmountForDisplay } from '../utils/stripe-helpers'

type Campaign = {
  id: number
  slug: string
  title: string
  description: string
  goal_amount: number
  currency: string
  end_date: string | null
  status: string
  banner_url: string | null
}

type DonationState = {
  destination_currency_total: number
  total_transactions: number
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null
  const ms = new Date(dateStr).getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

export default function CampaignHero({ campaign }: { campaign: Campaign }) {
  const [donations, setDonations] = useState<DonationState>({ destination_currency_total: 0, total_transactions: 0 })
  const [donationsLoading, setDonationsLoading] = useState(true)
  const [amount, setAmount] = useState('25')
  const [email, setEmail] = useState('')
  const [donating, setDonating] = useState(false)
  const [donateError, setDonateError] = useState('')
  const router = useRouter()

  const cardBg = useColorModeValue('white', 'gray.700')
  const mutedText = useColorModeValue('gray.500', 'gray.400')

  const daysLeft = daysUntil(campaign.end_date)
  const raisedAmount = donations.destination_currency_total / 100
  const percent = Math.min(100, (raisedAmount / campaign.goal_amount) * 100)

  useEffect(() => {
    fetch(`/api/donation_details?destination_currency=${campaign.currency}&campaign_id=${campaign.slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.destination_currency_total !== undefined) setDonations(d)
      })
      .catch(() => {})
      .finally(() => setDonationsLoading(false))
  }, [campaign.slug, campaign.currency])

  // Show success/cancelled message from URL params
  useEffect(() => {
    if (router.query.status === 'cancelled') setDonateError('Your donation was cancelled. No charge was made.')
  }, [router.query.status])

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault()
    setDonateError('')
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setDonateError('Please enter a valid donation amount.')
      return
    }
    setDonating(true)
    try {
      const res = await fetch(`/api/campaigns/${campaign.slug}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: numericAmount, currency: campaign.currency, customer_email: email || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not start checkout')

      const stripe = await getStripe()
      const { error } = await stripe!.redirectToCheckout({ sessionId: data.id })
      if (error) throw error
    } catch (err) {
      setDonateError(err instanceof Error ? err.message : 'Something went wrong.')
      setDonating(false)
    }
  }

  return (
    <Box
      display="flex"
      gap={[4, 4, 0]}
      my={8}
      rounded="xl"
      shadow="lg"
      flexDirection={['column', 'column', 'row']}
      bg={cardBg}
      overflow="hidden"
    >
      {/* Left: Banner or color block */}
      <Flex
        w={['auto', 'auto', '60%']}
        minH={['200px', '300px', 'auto']}
        bg={campaign.banner_url ? 'transparent' : useColorModeValue('yellow.50', 'gray.600')}
        position="relative"
        align="center"
        justify="center"
        p={campaign.banner_url ? 0 : 10}
      >
        {campaign.banner_url ? (
          <Box
            as="img"
            src={campaign.banner_url}
            alt={campaign.title}
            w="full"
            h="full"
            objectFit="cover"
          />
        ) : (
          <Heading
            as="h1"
            size="xl"
            textAlign="center"
            color={useColorModeValue('gray.700', 'gray.100')}
            fontWeight="bold"
            lineHeight="shorter"
            px={4}
          >
            {campaign.title}
          </Heading>
        )}
      </Flex>

      {/* Right: Stats + Donate */}
      <Box
        w={['auto', 'auto', '40%']}
        maxW="380px"
        mx="auto"
        px={6}
        py={8}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Spacer />
        <Stack spacing={4} textAlign="center" w="full">
          {campaign.banner_url && (
            <Heading size="md" fontWeight="semibold" color={useColorModeValue('gray.700', 'gray.100')}>
              {campaign.title}
            </Heading>
          )}

          <Box>
            <Skeleton isLoaded={!donationsLoading}>
              <Heading color={useColorModeValue('gray.800', 'gray.100')}>
                {formatAmountForDisplay(raisedAmount, campaign.currency)}
              </Heading>
            </Skeleton>
            <Text color={mutedText} fontSize="sm">
              raised of {formatAmountForDisplay(campaign.goal_amount, campaign.currency)} goal
            </Text>
          </Box>

          <Skeleton isLoaded={!donationsLoading}>
            <Progress rounded="lg" size="md" colorScheme="green" value={percent} />
          </Skeleton>

          <HStack pt={1} justify="center" spacing={3}>
            <Skeleton isLoaded={!donationsLoading}>
              <Badge colorScheme="green">{donations.total_transactions} donors</Badge>
            </Skeleton>
            {daysLeft !== null && (
              <Badge colorScheme={daysLeft > 0 ? 'blue' : 'red'}>
                {daysLeft > 0 ? `${daysLeft} days left` : 'Campaign ended'}
              </Badge>
            )}
          </HStack>

          {/* Donate form */}
          {(campaign.status === 'active' && (daysLeft === null || daysLeft > 0)) && (
            <Box as="form" onSubmit={handleDonate} pt={2}>
              <Stack spacing={3}>
                <Flex gap={2}>
                  <Input
                    type="number"
                    min={1}
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    size="lg"
                    textAlign="center"
                    fontWeight="bold"
                    _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
                  />
                  <Box
                    display="flex"
                    alignItems="center"
                    px={3}
                    bg={useColorModeValue('gray.50', 'gray.600')}
                    border="1px solid"
                    borderColor={useColorModeValue('gray.200', 'gray.500')}
                    rounded="md"
                    fontWeight="semibold"
                    fontSize="sm"
                    color={mutedText}
                    whiteSpace="nowrap"
                  >
                    {campaign.currency}
                  </Box>
                </Flex>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="md"
                    _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
                  />
                </FormControl>
                <Button
                  type="submit"
                  w="full"
                  size="lg"
                  colorScheme="yellow"
                  fontWeight="semibold"
                  isLoading={donating}
                  loadingText="Loading checkout..."
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                >
                  Donate {campaign.currency}
                </Button>
                {donateError && (
                  <Text fontSize="sm" color="red.500">{donateError}</Text>
                )}
                <Text fontSize="xs" color={mutedText}>
                  Secure checkout powered by Stripe
                </Text>
              </Stack>
            </Box>
          )}
        </Stack>
        <Spacer />
      </Box>
    </Box>
  )
}
