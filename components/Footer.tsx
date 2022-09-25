import {
  Box,
  chakra,
  Container,
  Image,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode, useContext } from "react";
import logoDark from "../public/logo-dark.svg";
import logoLight from "../public/logo.svg";
import ShareCard from "./ShareCard";
import StickyCTA from "./StickyFooter";
import LevelModal from "./LevelModal";
import AppContext from "../context/app-context";
import NextLink from "next/link"
const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={9}
      h={9}
      cursor={"pointer"}
      as={"a"}
      href={href}
      fontSize="lg"
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      target="_blank"
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithLogoLeft() {
  const logo = useColorModeValue(logoLight, logoDark);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const app = useContext(AppContext);
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      textAlign="center"
      borderTop={"1px solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      mb={isMobile ? 20: 0}
    >
      <LevelModal isOpen={app.state.popup.isOpen}  onClose={() => app.onPopupClose()} />
      {isMobile && <StickyCTA />}
      <Box maxW="4xl" mx="auto" py={8} px={[0, 8]}>
        {<ShareCard justifyContent="left" shadow="lg" />}
      </Box>
      <Container
        as={Stack}
        maxW={"7xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <NextLink href="/" passHref><Link><Image src={logo.src} maxW={[32, 32]} my={2} /></Link></NextLink>
        <Text>© 2022 Shahul & Zeenat Foundation. All rights reserved</Text>
        <Stack direction={"row"} spacing={4}>
          <SocialButton
            label={"Facebook"}
            href={"https://www.facebook.com/shahulzeenatfoundation/"}
          >
            <FaFacebook />
          </SocialButton>
          <SocialButton
            label={"Instagram"}
            href={"https://www.instagram.com/shahulzeenatfoundation/"}
          >
            <FaInstagram />
          </SocialButton>
          <SocialButton
            label={"YouTube"}
            href={"https://www.youtube.com/channel/UCCr6ZYSIH95aGaUjt9g_42w"}
          >
            <FaYoutube />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
