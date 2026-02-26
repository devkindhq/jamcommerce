import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { BsCheck } from 'react-icons/bs'
import MarketingLayout from '../components/MarketingLayout'

// ─── Pricing Tier ─────────────────────────────────────────────────────────────

type Tier = {
  name: string
  price: string
  period?: string
  tagline: string
  fee: string
  features: string[]
  cta: string
  ctaHref: string
  highlighted?: boolean
}

const tiers: Tier[] = [
  {
    name: 'Starter',
    price: 'Free',
    tagline: 'For individuals and small causes getting started.',
    fee: '2% transaction fee',
    features: [
      '1 active campaign',
      'Multi-currency donations',
      'Stripe-native checkout',
      'Real-time goal tracking',
      'Share card + social links',
      'Community support',
    ],
    cta: 'Start for free',
    ctaHref: '#waitlist',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    tagline: 'For organizations running campaigns that matter.',
    fee: '1% transaction fee',
    features: [
      'Unlimited active campaigns',
      'Multi-currency donations',
      'Stripe-native checkout',
      'Real-time goal tracking',
      'Custom campaign domain',
      'Email + priority support',
      'Campaign analytics',
      'Remove JamCommerce branding',
    ],
    cta: 'Get early access',
    ctaHref: '/#waitlist',
    highlighted: true,
  },
  {
    name: 'Org',
    price: '$99',
    period: '/month',
    tagline: 'For foundations, NGOs, and teams with serious scale.',
    fee: '0.5% transaction fee',
    features: [
      'Everything in Pro',
      'White-label branding',
      'Team seats',
      'API access',
      'Advanced analytics',
      'Dedicated account support',
      'Self-host license included',
      'Custom SLA available',
    ],
    cta: 'Talk to us',
    ctaHref: 'mailto:hello@jamcommerce.co',
  },
]

// ─── Tier Card ────────────────────────────────────────────────────────────────

function TierCard({ tier }: { tier: Tier }) {
  const bg = useColorModeValue('white', 'gray.800')
  const border = useColorModeValue('gray.200', 'gray.700')
  const highlightBorder = useColorModeValue('yellow.400', 'yellow.300')
  const mutedText = useColorModeValue('gray.500', 'gray.400')
  const featureText = useColorModeValue('gray.700', 'gray.200')
  const feeBg = useColorModeValue('gray.50', 'gray.700')

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={tier.highlighted ? highlightBorder : border}
      rounded="xl"
      p={8}
      shadow={tier.highlighted ? 'lg' : 'sm'}
      position="relative"
      display="flex"
      flexDirection="column"
    >
      {tier.highlighted && (
        <Badge
          position="absolute"
          top={-3}
          left="50%"
          transform="translateX(-50%)"
          colorScheme="yellow"
          fontSize="xs"
          fontWeight="semibold"
          px={3}
          py={1}
          rounded="full"
          textTransform="none"
        >
          Most popular
        </Badge>
      )}

      <Stack spacing={6} flex={1}>
        <Box>
          <Text fontWeight="semibold" fontSize="sm" color={mutedText} mb={1}>
            {tier.name}
          </Text>
          <HStack align="baseline" spacing={1}>
            <Heading as="h3" size="2xl" fontWeight="extrabold">
              {tier.price}
            </Heading>
            {tier.period && (
              <Text fontSize="md" color={mutedText}>
                {tier.period}
              </Text>
            )}
          </HStack>
          <Text fontSize="sm" color={mutedText} mt={2} lineHeight="tall">
            {tier.tagline}
          </Text>
        </Box>

        <Box
          bg={feeBg}
          rounded="lg"
          px={4}
          py={3}
          textAlign="center"
        >
          <Text fontSize="sm" fontWeight="semibold" color={featureText}>
            {tier.fee}
          </Text>
        </Box>

        <List spacing={3} flex={1}>
          {tier.features.map((feature) => (
            <ListItem key={feature} display="flex" alignItems="flex-start">
              <ListIcon
                as={BsCheck}
                color="yellow.400"
                mt="2px"
                fontSize="lg"
                flexShrink={0}
              />
              <Text fontSize="sm" color={featureText} lineHeight="tall">
                {feature}
              </Text>
            </ListItem>
          ))}
        </List>

        <Button
          as="a"
          href={tier.ctaHref}
          size="lg"
          w="full"
          colorScheme={tier.highlighted ? 'yellow' : 'gray'}
          variant={tier.highlighted ? 'solid' : 'outline'}
          fontWeight="semibold"
        >
          {tier.cta}
        </Button>
      </Stack>
    </Box>
  )
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────

function FAQ({ q, a }: { q: string; a: string }) {
  const mutedText = useColorModeValue('gray.600', 'gray.400')
  return (
    <Box>
      <Text fontWeight="semibold" mb={2}>{q}</Text>
      <Text color={mutedText} lineHeight="tall">{a}</Text>
    </Box>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const mutedText = useColorModeValue('gray.600', 'gray.400')
  const divider = useColorModeValue('gray.100', 'gray.700')
  const altBg = useColorModeValue('gray.50', 'gray.900')

  return (
    <MarketingLayout
      title="Pricing — JamCommerce"
      description="Simple, honest pricing. Start free. Upgrade when you're ready. No lock-in, no hidden fees."
    >
      {/* ── Header ── */}
      <Box bg={altBg} borderBottom="1px solid" borderColor={divider}>
        <Container maxW="3xl" py={[16, 20]} textAlign="center">
          <VStack spacing={4}>
            <Heading as="h1" size="2xl" fontWeight="extrabold" letterSpacing="tight">
              Honest pricing.
            </Heading>
            <Text fontSize={['lg', 'xl']} color={mutedText} lineHeight="tall">
              Start free. Upgrade when your campaigns need it.
              No lock-in, no hidden fees, no surprise bills.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* ── Tiers ── */}
      <Container maxW="6xl" py={[14, 20]}>
        <SimpleGrid columns={[1, 1, 3]} spacing={6} alignItems="flex-start">
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </SimpleGrid>

        <Box textAlign="center" mt={10}>
          <Text fontSize="sm" color={mutedText}>
            All plans include SSL, Stripe-native checkout, and full campaign history.
            Transaction fees are charged on top of Stripe's standard processing fees.
          </Text>
        </Box>
      </Container>

      <Divider borderColor={divider} />

      {/* ── FAQ ── */}
      <Container maxW="3xl" py={[14, 20]}>
        <VStack spacing={4} textAlign="center" mb={10}>
          <Heading as="h2" size="xl" fontWeight="bold" letterSpacing="tight">
            Common questions
          </Heading>
        </VStack>
        <SimpleGrid columns={[1, 1, 2]} spacing={10}>
          <FAQ
            q="What does the transaction fee cover?"
            a="It covers platform maintenance, currency conversion infrastructure, and ongoing development. Stripe's own processing fee (typically 1.4–2.9% + 30c) is separate and goes directly to Stripe."
          />
          <FAQ
            q="Can I switch plans mid-campaign?"
            a="Yes. Upgrade or downgrade at any time. Changes take effect immediately. If you upgrade, the lower fee applies to all transactions from that point forward."
          />
          <FAQ
            q="What does self-hosting mean for Org?"
            a="You get a license to deploy JamCommerce on your own servers, under your own brand, with your own domain. You manage the infrastructure. We provide the code and support."
          />
          <FAQ
            q="Do you offer discounts for nonprofits?"
            a="Registered nonprofits and charities get 50% off Pro and Org plans. Reach out to us with your registration details and we'll set you up."
          />
          <FAQ
            q="Is there a free trial for Pro?"
            a="Everyone on the waitlist gets three months of Pro free when we launch. No credit card required to claim it."
          />
          <FAQ
            q="What happens if I cancel?"
            a="Your campaigns stay live in read-only mode for 90 days after cancellation so donors can still see the history. You can export all your data at any time."
          />
        </SimpleGrid>
      </Container>

      <Divider borderColor={divider} />

      {/* ── Bottom CTA ── */}
      <Box bg={altBg}>
        <Container maxW="2xl" py={[14, 20]} textAlign="center">
          <VStack spacing={6}>
            <Heading as="h2" size="lg" fontWeight="bold">
              Not sure which plan is right?
            </Heading>
            <Text color={mutedText} lineHeight="tall">
              Start on Starter. It's free and you can run a real campaign today.
              Upgrade when you need more.
            </Text>
            <Button
              as="a"
              href="/#waitlist"
              size="lg"
              colorScheme="yellow"
              fontWeight="semibold"
              px={10}
            >
              Get early access
            </Button>
          </VStack>
        </Container>
      </Box>
    </MarketingLayout>
  )
}
