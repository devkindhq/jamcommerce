import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import logoDark from "../public/logo-dark.svg";
import logoLight from "../public/logo.svg";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo", href: "/demo" },
  { label: "GitHub", href: "https://github.com/rome2o/jamcommerce" },
];

export default function MarketingHeader() {
  const logo = useColorModeValue(logoLight, logoDark);
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const linkColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="6xl">
        <Flex py={4} align="center" justify="space-between">
          <NextLink href="/" passHref>
            <Link>
              <Image src={logo.src} maxW={32} />
            </Link>
          </NextLink>

          <HStack spacing={6} display={{ base: "none", md: "flex" }}>
            {NAV_LINKS.map((link) => (
              <NextLink key={link.label} href={link.href} passHref>
                <Link
                  fontSize="sm"
                  fontWeight="medium"
                  color={linkColor}
                  _hover={{ color: "yellow.500", textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              </NextLink>
            ))}
          </HStack>

          <HStack spacing={3}>
            <NextLink href="#waitlist" passHref>
              <Button
                as="a"
                size="sm"
                colorScheme="yellow"
                fontWeight="semibold"
              >
                Get started free
              </Button>
            </NextLink>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
