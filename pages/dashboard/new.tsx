import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import MarketingLayout from '../../components/MarketingLayout'
import AuthContext from '../../context/auth-context'

type FormData = {
  title: string
  description: string
  goal_amount: string
  currency: string
  end_date: string
}

const CURRENCIES = ['AUD', 'USD', 'EUR', 'CAD', 'GBP', 'NZD']

function StepIndicator({ current, total }: { current: number; total: number }) {
  const activeColor = useColorModeValue('yellow.500', 'yellow.300')
  const inactiveColor = useColorModeValue('gray.200', 'gray.600')
  const activeText = useColorModeValue('yellow.700', 'yellow.200')
  const inactiveText = useColorModeValue('gray.400', 'gray.500')

  return (
    <HStack spacing={0} mb={8}>
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1
        const isActive = step === current
        const isDone = step < current
        return (
          <Flex key={step} align="center" flex={step < total ? 1 : undefined}>
            <Flex
              w={8}
              h={8}
              rounded="full"
              bg={isActive || isDone ? activeColor : inactiveColor}
              align="center"
              justify="center"
              flexShrink={0}
            >
              <Text
                fontSize="sm"
                fontWeight="bold"
                color={isActive || isDone ? 'white' : inactiveText}
              >
                {step}
              </Text>
            </Flex>
            {step < total && (
              <Box flex={1} h="2px" bg={isDone ? activeColor : inactiveColor} />
            )}
          </Flex>
        )
      })}
    </HStack>
  )
}

export default function NewCampaignPage() {
  const { user, session, loading } = useContext(AuthContext)
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormData>({
    title: '',
    description: '',
    goal_amount: '1000',
    currency: 'AUD',
    end_date: '',
  })

  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.100', 'gray.700')
  const mutedText = useColorModeValue('gray.500', 'gray.400')
  const summaryBg = useColorModeValue('gray.50', 'gray.700')

  useEffect(() => {
    if (!loading && !user) router.replace('/auth/signin')
  }, [user, loading])

  const set = (field: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }))

  const handleSubmit = async () => {
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          goal_amount: parseFloat(form.goal_amount),
          currency: form.currency,
          end_date: form.end_date || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not create campaign')
      router.push(`/c/${data.slug}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setSubmitting(false)
    }
  }

  if (loading || !user) return null

  return (
    <MarketingLayout title="New Campaign — JamCommerce">
      <Container maxW="lg" py={[8, 14]}>
        <Box mb={6}>
          <Heading as="h1" size="xl" fontWeight="bold">
            Launch a campaign
          </Heading>
          <Text color={mutedText} mt={1}>
            You'll be live in under five minutes.
          </Text>
        </Box>

        <StepIndicator current={step} total={3} />

        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={cardBorder}
          rounded="xl"
          p={8}
          shadow="sm"
        >
          {step === 1 && (
            <Stack spacing={6}>
              <Heading as="h2" size="md" fontWeight="semibold">
                What's this campaign for?
              </Heading>

              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="medium">Campaign title</FormLabel>
                <Input
                  value={form.title}
                  onChange={(e) => set('title')(e.target.value)}
                  placeholder="Flood relief for Northern Queensland"
                  size="lg"
                  _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
                />
                <FormHelperText>Clear and specific titles raise more.</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="medium">Tell your story</FormLabel>
                <Textarea
                  value={form.description}
                  onChange={(e) => set('description')(e.target.value)}
                  placeholder="Explain who this helps, why it matters, and how funds will be used..."
                  rows={6}
                  resize="vertical"
                  _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
                />
              </FormControl>

              <Button
                colorScheme="yellow"
                size="lg"
                fontWeight="semibold"
                isDisabled={!form.title.trim()}
                onClick={() => setStep(2)}
              >
                Next: Set your goal
              </Button>
            </Stack>
          )}

          {step === 2 && (
            <Stack spacing={6}>
              <Heading as="h2" size="md" fontWeight="semibold">
                How much are you raising?
              </Heading>

              <HStack spacing={4} align="flex-end">
                <FormControl isRequired flex={1}>
                  <FormLabel fontSize="sm" fontWeight="medium">Goal amount</FormLabel>
                  <NumberInput
                    value={form.goal_amount}
                    onChange={(val) => set('goal_amount')(val)}
                    min={1}
                    size="lg"
                  >
                    <NumberInputField
                      _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl w="32">
                  <FormLabel fontSize="sm" fontWeight="medium">Currency</FormLabel>
                  <Select
                    value={form.currency}
                    onChange={(e) => set('currency')(e.target.value)}
                    size="lg"
                    _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="medium">End date (optional)</FormLabel>
                <Input
                  type="date"
                  value={form.end_date}
                  onChange={(e) => set('end_date')(e.target.value)}
                  size="lg"
                  _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
                />
                <FormHelperText>Leave blank to run indefinitely.</FormHelperText>
              </FormControl>

              <HStack>
                <Button variant="ghost" onClick={() => setStep(1)} flex={1}>
                  Back
                </Button>
                <Button
                  colorScheme="yellow"
                  size="lg"
                  fontWeight="semibold"
                  isDisabled={!form.goal_amount || parseFloat(form.goal_amount) <= 0}
                  onClick={() => setStep(3)}
                  flex={2}
                >
                  Next: Review
                </Button>
              </HStack>
            </Stack>
          )}

          {step === 3 && (
            <Stack spacing={6}>
              <Heading as="h2" size="md" fontWeight="semibold">
                Ready to launch?
              </Heading>

              <Box bg={summaryBg} rounded="lg" p={5}>
                <VStack align="flex-start" spacing={3}>
                  <Box>
                    <Text fontSize="xs" fontWeight="semibold" color={mutedText} textTransform="uppercase" letterSpacing="wide">
                      Title
                    </Text>
                    <Text fontWeight="medium">{form.title}</Text>
                  </Box>
                  {form.description && (
                    <Box>
                      <Text fontSize="xs" fontWeight="semibold" color={mutedText} textTransform="uppercase" letterSpacing="wide">
                        Description
                      </Text>
                      <Text fontSize="sm" color={mutedText} noOfLines={3}>{form.description}</Text>
                    </Box>
                  )}
                  <Box>
                    <Text fontSize="xs" fontWeight="semibold" color={mutedText} textTransform="uppercase" letterSpacing="wide">
                      Goal
                    </Text>
                    <Text fontWeight="medium">
                      {form.currency} {parseFloat(form.goal_amount).toLocaleString()}
                    </Text>
                  </Box>
                  {form.end_date && (
                    <Box>
                      <Text fontSize="xs" fontWeight="semibold" color={mutedText} textTransform="uppercase" letterSpacing="wide">
                        End date
                      </Text>
                      <Text fontWeight="medium">
                        {new Date(form.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </Text>
                    </Box>
                  )}
                </VStack>
              </Box>

              {error && (
                <Text color="red.500" fontSize="sm">{error}</Text>
              )}

              <HStack>
                <Button variant="ghost" onClick={() => setStep(2)} flex={1} isDisabled={submitting}>
                  Back
                </Button>
                <Button
                  colorScheme="yellow"
                  size="lg"
                  fontWeight="semibold"
                  onClick={handleSubmit}
                  isLoading={submitting}
                  loadingText="Launching..."
                  flex={2}
                >
                  Launch campaign
                </Button>
              </HStack>
            </Stack>
          )}
        </Box>
      </Container>
    </MarketingLayout>
  )
}
