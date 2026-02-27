import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
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

export default function SignInPage() {
  const { signIn } = useContext(AuthContext)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.100', 'gray.700')
  const mutedText = useColorModeValue('gray.500', 'gray.400')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.push('/dashboard')
  }

  return (
    <MarketingLayout
      title="Sign in — JamCommerce"
      description="Sign in to your JamCommerce account to manage your campaigns."
    >
      <Container maxW="md" py={[16, 24]}>
        <Stack spacing={8}>
          <Box textAlign="center">
            <Heading as="h1" size="xl" fontWeight="bold" mb={2}>
              Welcome back.
            </Heading>
            <Text color={mutedText}>Sign in to manage your campaigns.</Text>
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
                    placeholder="••••••••"
                    size="lg"
                    _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #ECC94B' }}
                  />
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="yellow"
                  size="lg"
                  w="full"
                  fontWeight="semibold"
                  isLoading={loading}
                  loadingText="Signing in..."
                  mt={2}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Box>

          <Text textAlign="center" fontSize="sm" color={mutedText}>
            Don't have an account?{' '}
            <NextLink href="/auth/signup" passHref>
              <Link color="yellow.500" fontWeight="medium">
                Create one free
              </Link>
            </NextLink>
          </Text>
        </Stack>
      </Container>
    </MarketingLayout>
  )
}
