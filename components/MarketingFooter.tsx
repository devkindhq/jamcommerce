import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import logoDark from "../public/logo-dark.svg";
import logoLight from "../public/logo.svg";

export default function MarketingFooter() {
  const logo = useColorModeValue(logoLight, logoDark);
  const bg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.500", "gray.400");
  const linkColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box bg={bg} borderTop="1px solid" borderColor={borderColor}>
      <Container maxW="6xl">
        <Flex
          py={6}
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={4}
        >
          <NextLink href="/" passHref>
            <Link>
              <Image src={logo.src} maxW={28} />
            </Link>
          </NextLink>

          <Text fontSize="sm" color={textColor}>
            © {new Date().getFullYear()} JamCommerce. Open source. MIT License.
          </Text>

          <HStack spacing={4} fontSize="sm">
            <NextLink href="/pricing" passHref>
              <Link color={linkColor} _hover={{ color: "yellow.500" }}>
                Pricing
              </Link>
            </NextLink>
            <NextLink href="/demo" passHref>
              <Link color={linkColor} _hover={{ color: "yellow.500" }}>
                Demo
              </Link>
            </NextLink>
            <Link
              href="https://github.com/rome2o/jamcommerce"
              isExternal
              color={linkColor}
              _hover={{ color: "yellow.500" }}
            >
              GitHub
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
