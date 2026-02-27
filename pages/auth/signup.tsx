import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import MarketingLayout from '../../components/MarketingLayout'
import AuthContext from '../../context/auth-context'

export default function SignUpPage() {
  const { signUp } = useContext(AuthContext)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.100', 'gray.700')
  const mutedText = useColorModeValue('gray.500', 'gray.400')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    const { error } = await signUp(email, password)
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <MarketingLayout title="Check your inbox — JamCommerce">
        <Container maxW="md" py={[16, 24]} textAlign="center">
          <Stack spacing={4}>
            <Heading as="h1" size="xl" fontWeight="bold">
              Check your inbox.
            </Heading>
            <Text color={mutedText} lineHeight="tall">
              We've sent a confirmation link to <strong>{email}</strong>.
              Click it to activate your account, then come back to sign in.
            </Text>
            <NextLink href="/auth/signin" passHref>
              <Button as="a" colorScheme="yellow" size="lg" fontWeight="semibold" mt={4}>
                Go to sign in
              </Button>
            </NextLink>
          </Stack>
        </Container>
      </MarketingLayout>
    )
  }

  return (
    <MarketingLayout
      title="Create an account — JamCommerce"
      description="Create a free JamCommerce account and launch your first campaign today."
    >
      <Container maxW="md" py={[16, 24]}>
        <Stack spacing={8}>
          <Box textAlign="center">
            <Heading as="h1" size="xl" fontWeight="bold" mb={2}>
              Start for free.
            </Heading>
            <Text color={mutedText}>No credit card needed to create an account.</Text>
          </Box>

          <Box
            bg={cardBg}
            border="1px solid"
            borderColor={cardBorder}
            rounded="xl"
            p={8}
            shadow="sm"
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={5}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    size="lg"
                    _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel fontSize="sm" fontWeight="medium">
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    size="lg"
                    _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
                  />
                  <FormHelperText>Minimum 8 characters.</FormHelperText>
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="yellow"
                  size="lg"
                  w="full"
                  fontWeight="semibold"
                  isLoading={loading}
                  loadingText="Creating account..."
                  mt={2}
                >
                  Create account
                </Button>
              </Stack>
            </form>
          </Box>

          <Text textAlign="center" fontSize="sm" color={mutedText}>
            Already have an account?{' '}
            <NextLink href="/auth/signin" passHref>
              <Link color="yellow.500" fontWeight="medium">
                Sign in
              </Link>
            </NextLink>
          </Text>
        </Stack>
      </Container>
    </MarketingLayout>
  )
}
