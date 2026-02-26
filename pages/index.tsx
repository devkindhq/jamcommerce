import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import MarketingLayout from '../components/MarketingLayout'

// ─── Waitlist Form ────────────────────────────────────────────────────────────

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const inputBg = useColorModeValue('white', 'gray.800')
  const inputBorder = useColorModeValue('gray.200', 'gray.600')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <Box
        bg={useColorModeValue('yellow.50', 'yellow.900')}
        border="1px solid"
        borderColor={useColorModeValue('yellow.200', 'yellow.700')}
        rounded="lg"
        px={6}
        py={4}
        textAlign="center"
      >
        <Text fontWeight="semibold" color={useColorModeValue('yellow.800', 'yellow.200')}>
          You're on the list.
        </Text>
        <Text fontSize="sm" color={useColorModeValue('yellow.700', 'yellow.300')} mt={1}>
          We'll reach out before we launch with your early access link.
        </Text>
      </Box>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit} w="full">
      <Flex gap={3} flexDirection={['column', 'row']}>
        <FormControl flex={1}>
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            size="lg"
            bg={inputBg}
            borderColor={inputBorder}
            _hover={{ borderColor: 'yellow.400' }}
            _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
          />
        </FormControl>
        <Button
          type="submit"
          size="lg"
          colorScheme="yellow"
          fontWeight="semibold"
          isLoading={status === 'loading'}
          loadingText="Saving..."
          px={8}
          flexShrink={0}
        >
          Join the waitlist
        </Button>
      </Flex>
      {status === 'error' && (
        <Text fontSize="sm" color="red.500" mt={2}>
          Something went wrong. Please try again.
        </Text>
      )}
      <Text fontSize="xs" color={useColorModeValue('gray.400', 'gray.500')} mt={3}>
        No spam. No noise. One email when we launch.
      </Text>
    </Box>
  )
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  const bg = useColorModeValue('white', 'gray.800')
  const border = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={border}
      rounded="xl"
      p={8}
      shadow="sm"
    >
      <Heading as="h3" size="md" mb={3} fontWeight="semibold">
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} lineHeight="tall">
        {description}
      </Text>
    </Box>
  )
}

// ─── Step ─────────────────────────────────────────────────────────────────────

function Step({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <VStack align="flex-start" spacing={3}>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color={useColorModeValue('yellow.400', 'yellow.300')}
        lineHeight={1}
      >
        {number}
      </Text>
      <Heading as="h3" size="md" fontWeight="semibold">
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} lineHeight="tall">
        {description}
      </Text>
    </VStack>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroBg = useColorModeValue('gray.50', 'gray.900')
  const sectionBg = useColorModeValue('white', 'gray.800')
  const altSectionBg = useColorModeValue('gray.50', 'gray.900')
  const mutedText = useColorModeValue('gray.600', 'gray.400')
  const divider = useColorModeValue('gray.100', 'gray.700')

  return (
    <MarketingLayout>

      {/* ── Hero ── */}
      <Box bg={heroBg} borderBottom="1px solid" borderColor={divider}>
        <Container maxW="4xl" py={[20, 28]} textAlign="center">
          <Stack spacing={8} align="center">
            <Badge
              colorScheme="yellow"
              fontSize="xs"
              fontWeight="semibold"
              px={3}
              py={1}
              rounded="full"
              textTransform="none"
              letterSpacing="wide"
            >
              Open source · Free to start
            </Badge>

            <Heading
              as="h1"
              fontSize={['3xl', '4xl', '5xl']}
              fontWeight="extrabold"
              lineHeight="shorter"
              letterSpacing="tight"
            >
              The fundraising platform
              <br />
              built for the whole world.
            </Heading>

            <Text
              fontSize={['lg', 'xl']}
              color={mutedText}
              maxW="2xl"
              lineHeight="tall"
            >
              Launch a campaign in minutes. Accept donations in any currency.
              Built on Stripe. You own the platform.
            </Text>

            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Button
                as="a"
                href="#waitlist"
                size="lg"
                colorScheme="yellow"
                fontWeight="semibold"
                px={8}
                _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
                transition="all 0.15s"
              >
                Get early access
              </Button>
              <Button
                as="a"
                href="/demo"
                size="lg"
                variant="outline"
                fontWeight="semibold"
                px={8}
                _hover={{ transform: 'translateY(-1px)' }}
                transition="all 0.15s"
              >
                See a live campaign
              </Button>
            </HStack>

            <Text fontSize="sm" color={useColorModeValue('gray.400', 'gray.500')}>
              Stripe-native&nbsp;&nbsp;·&nbsp;&nbsp;Multi-currency&nbsp;&nbsp;·&nbsp;&nbsp;Self-hostable
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* ── Features ── */}
      <Box bg={sectionBg} id="features">
        <Container maxW="6xl" py={[16, 24]}>
          <VStack spacing={4} textAlign="center" mb={[10, 16]}>
            <Heading as="h2" size="xl" fontWeight="bold" letterSpacing="tight">
              Everything a campaign needs. Nothing it doesn't.
            </Heading>
            <Text fontSize="lg" color={mutedText} maxW="2xl">
              We stripped fundraising down to what matters: getting money from people
              who care, to causes that need it, as fast as possible.
            </Text>
          </VStack>

          <SimpleGrid columns={[1, 1, 3]} spacing={6}>
            <FeatureCard
              title="Any currency, anywhere"
              description="Your donors give in their local currency. You receive in yours. AUD, USD, EUR, CAD, IDR and more — converted automatically in real time. No friction. No dropped donations."
            />
            <FeatureCard
              title="Stripe-native, zero red tape"
              description="No merchant accounts to apply for. No approval queues. Connect your existing Stripe account, write your story, set a goal, and launch. You can be live within the hour."
            />
            <FeatureCard
              title="Open source and yours"
              description="Every line of code is public. Self-host it on your own infrastructure, white-label it for your organization, or use our hosted version. You own your donor data, always."
            />
          </SimpleGrid>
        </Container>
      </Box>

      <Divider borderColor={divider} />

      {/* ── How It Works ── */}
      <Box bg={altSectionBg}>
        <Container maxW="6xl" py={[16, 24]}>
          <VStack spacing={4} textAlign="center" mb={[10, 16]}>
            <Heading as="h2" size="xl" fontWeight="bold" letterSpacing="tight">
              From idea to live campaign in under ten minutes.
            </Heading>
            <Text fontSize="lg" color={mutedText} maxW="xl">
              We designed this for the person who has never built a fundraising page before.
            </Text>
          </VStack>

          <SimpleGrid columns={[1, 1, 3]} spacing={10}>
            <Step
              number="01"
              title="Create your campaign"
              description="Add a title, tell your story, and set a goal. Upload a photo. You don't need a developer, a designer, or a payment processor account."
            />
            <Step
              number="02"
              title="Share your link"
              description="One URL. Works on every device, in every browser. Donors can give in their own currency — they never need to think about exchange rates."
            />
            <Step
              number="03"
              title="Receive your funds"
              description="Stripe handles the payments. Funds land in your account directly, minus a small platform fee. No middlemen holding your money."
            />
          </SimpleGrid>
        </Container>
      </Box>

      <Divider borderColor={divider} />

      {/* ── Trust bar ── */}
      <Box bg={sectionBg}>
        <Container maxW="4xl" py={[10, 14]} textAlign="center">
          <Text fontSize="sm" fontWeight="semibold" color={mutedText} letterSpacing="wider" textTransform="uppercase" mb={4}>
            Built on infrastructure you already trust
          </Text>
          <Text fontSize={['md', 'lg']} color={mutedText} lineHeight="tall">
            JamCommerce runs on Stripe — the same payments platform behind Shopify, Lyft, and Amazon.
            Your donors' payment details never touch our servers. Fully open source,
            reviewed by the community.
          </Text>
        </Container>
      </Box>

      <Divider borderColor={divider} />

      {/* ── Waitlist ── */}
      <Box bg={altSectionBg} id="waitlist">
        <Container maxW="2xl" py={[16, 24]}>
          <VStack spacing={6} textAlign="center">
            <Heading as="h2" size="xl" fontWeight="bold" letterSpacing="tight">
              Be among the first.
            </Heading>
            <Text fontSize={['md', 'lg']} color={mutedText} lineHeight="tall">
              We're building the fundraising infrastructure the world has been missing.
              Join the waitlist and get three months of Pro free when we launch.
            </Text>
            <Box w="full" pt={2}>
              <WaitlistForm />
            </Box>
          </VStack>
        </Container>
      </Box>

    </MarketingLayout>
  )
}
