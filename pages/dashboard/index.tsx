import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import MarketingLayout from '../../components/MarketingLayout'
import AuthContext from '../../context/auth-context'
import { formatAmountForDisplay } from '../../utils/stripe-helpers'

type Campaign = {
  id: number
  slug: string
  title: string
  description: string
  goal_amount: number
  currency: string
  end_date: string | null
  status: string
  created_at: string
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const bg = useColorModeValue('white', 'gray.800')
  const border = useColorModeValue('gray.100', 'gray.700')
  const mutedText = useColorModeValue('gray.500', 'gray.400')

  const daysLeft = campaign.end_date
    ? Math.max(0, Math.ceil((new Date(campaign.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={border}
      rounded="xl"
      p={6}
      shadow="sm"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Flex justify="space-between" align="flex-start">
        <Heading as="h3" size="md" fontWeight="semibold" flex={1} mr={3} lineHeight="short">
          {campaign.title}
        </Heading>
        <Badge
          colorScheme={campaign.status === 'active' ? 'green' : 'gray'}
          flexShrink={0}
        >
          {campaign.status}
        </Badge>
      </Flex>

      <Stack spacing={1}>
        <Text fontSize="sm" color={mutedText}>
          Goal: {formatAmountForDisplay(campaign.goal_amount, campaign.currency)}
        </Text>
        {daysLeft !== null && (
          <Text fontSize="sm" color={mutedText}>
            {daysLeft > 0 ? `${daysLeft} days remaining` : 'Campaign ended'}
          </Text>
        )}
      </Stack>

      <Flex gap={3} mt="auto" pt={2}>
        <NextLink href={`/c/${campaign.slug}`} passHref>
          <Button as="a" size="sm" variant="outline" flex={1}>
            View live
          </Button>
        </NextLink>
        <NextLink href={`/dashboard/campaigns/${campaign.slug}`} passHref>
          <Button as="a" size="sm" colorScheme="yellow" variant="ghost" flex={1}>
            Analytics
          </Button>
        </NextLink>
      </Flex>
    </Box>
  )
}

export default function DashboardPage() {
  const { user, session, loading, signOut } = useContext(AuthContext)
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [campaignsLoading, setCampaignsLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const mutedText = useColorModeValue('gray.500', 'gray.400')
  const emptyBg = useColorModeValue('gray.50', 'gray.800')
  const emptyBorder = useColorModeValue('gray.200', 'gray.600')

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/signin')
    }
  }, [user, loading])

  // Load campaigns
  useEffect(() => {
    if (!session?.access_token) return
    fetch('/api/campaigns', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCampaigns(data)
        else setFetchError(data.error || 'Could not load campaigns')
      })
      .catch(() => setFetchError('Could not load campaigns'))
      .finally(() => setCampaignsLoading(false))
  }, [session?.access_token])

  if (loading) {
    return (
      <MarketingLayout title="Dashboard — JamCommerce">
        <Flex justify="center" align="center" minH="50vh">
          <Spinner size="xl" color="yellow.400" />
        </Flex>
      </MarketingLayout>
    )
  }

  if (!user) return null

  return (
    <MarketingLayout title="Dashboard — JamCommerce">
      <Container maxW="6xl" py={[8, 12]}>
        <Flex
          justify="space-between"
          align={['flex-start', 'center']}
          flexDirection={['column', 'row']}
          gap={4}
          mb={10}
        >
          <Box>
            <Heading as="h1" size="xl" fontWeight="bold">
              Your campaigns
            </Heading>
            <Text color={mutedText} mt={1} fontSize="sm">
              {user.email}
            </Text>
          </Box>
          <Flex gap={3}>
            <NextLink href="/dashboard/new" passHref>
              <Button as="a" colorScheme="yellow" fontWeight="semibold">
                New campaign
              </Button>
            </NextLink>
            <Button
              variant="ghost"
              fontWeight="medium"
              onClick={async () => {
                await signOut()
                router.push('/')
              }}
            >
              Sign out
            </Button>
          </Flex>
        </Flex>

        {campaignsLoading ? (
          <Flex justify="center" py={16}>
            <Spinner color="yellow.400" />
          </Flex>
        ) : fetchError ? (
          <Text color="red.500">{fetchError}</Text>
        ) : campaigns.length === 0 ? (
          <Box
            bg={emptyBg}
            border="2px dashed"
            borderColor={emptyBorder}
            rounded="xl"
            p={[10, 16]}
            textAlign="center"
          >
            <Heading as="h3" size="md" fontWeight="semibold" mb={3}>
              No campaigns yet.
            </Heading>
            <Text color={mutedText} mb={6} lineHeight="tall">
              Create your first campaign and start raising funds in minutes.
            </Text>
            <NextLink href="/dashboard/new" passHref>
              <Button as="a" colorScheme="yellow" size="lg" fontWeight="semibold">
                Launch your first campaign
              </Button>
            </NextLink>
          </Box>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {campaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </MarketingLayout>
  )
}
