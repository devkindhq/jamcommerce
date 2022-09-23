import { LinkIcon } from "@chakra-ui/icons";
import {
  Box,
  ChakraComponent,
  Flex,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import AppContext from "../context/app-context";
import { social_links } from "../data/social_links";

import { formatAmountForDisplay } from "../utils/stripe-helpers";
import shareBanner from "../public/share-banner.png";
const copyURL = async () => {
  await navigator.clipboard.writeText(location.href);
};
export default function ShareCard(props: any) {
  const app = useContext(AppContext);
  const { justifyContent = "space-between", ...otherProps } = props;
  const ShareButtons = () => {
    return (
      <Flex mt={4} gridGap={2} flexWrap="wrap" maxW="2xl">
        {social_links.map((social_link, index) => {
          props = {
            ...(social_link.type && {as: "a", href: social_link.href})
          }
          return (
            <IconButton
              as="p"
              key={"social_link_" + index}
              rounded={"full"}
              fontSize={useBreakpointValue({ base: "xl", sm: "2xl" })}
              icon={social_link.icon}
              colorScheme={social_link.colorScheme ?? "pink"}
              aria-label={social_link.label}
              {...props}
            />
          );
        })}
      </Flex>
    );
  };
  return (
    <Box
      rounded="lg"
      backgroundImage={shareBanner.src}
      backgroundSize="cover"
      backgroundPosition={{
        base: "0px -0px",
        md: "0px -120px",
      }}
      overflow="hidden"
      {...props}
    >
      <Flex
        textAlign="left"
        justifyContent={justifyContent}
        direction={"row"}
        flexWrap={"wrap"}
        bg={useColorModeValue("blackAlpha.500", "blackAlpha.600")}
        p={9}
      >
        <Box>
          <Text
            fontSize={"3xl"}
            fontWeight={"semibold"}
            color={useColorModeValue("white", "white")}
          >
            Your share could raise{" "}
            {formatAmountForDisplay(
              61 * app.state.current_currency.value,
              app.state.current_currency.code
            )}
          </Text>
          <Text
            fontSize={"xl"}
            fontWeight={"semibold"}
            color={useColorModeValue("gray.200", "white")}
          >
            Invite your friends and family to donate.
          </Text>
          <ShareButtons />
        </Box>
      </Flex>
    </Box>
  );
}
