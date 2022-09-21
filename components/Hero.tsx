import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack, Image,
  Progress,
  Skeleton, Spacer,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BiDonateHeart } from "react-icons/bi";
import LevelModal from "../components/LevelModal";
import { RAISING_AMOUNT } from "../config";
import AppContext from "../context/app-context";
import endDate from "../data/donation_end_date";
import banner from "../public/banner.png";
import { formatAmountForDisplay } from "../utils/stripe-helpers";

type DonationDetails = {
  destination_currency_total: number;
  total_transactions: number;
};

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [donationDetails, setDonationDetails] = useState<DonationDetails>({
    destination_currency_total: 0,
    total_transactions: 0,
  });
  const [isPlayback, setPlayback] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [days, setDays] = useState<number>(0);
  const [campaignDate, setCampaignDate] = useState<string>("");
  const app = useContext(AppContext);
  const [show, setShow] = useState<boolean>(false);
  const LoadingSkeleton = ({
    show,
    height,
  }: {
    show: boolean;
    height?: number;
  }): JSX.Element => (
    <Skeleton display={!show ? "none" : "block"} height={height ?? 12} />
  );

  const handleToggle = () => setShow(!show);
  /**
   * This function use to count days from now to end date
   */
  const countLeftDays = () => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const end = new Date(endDate);
    const start = new Date();
    const diffDays = Math.round(Math.abs((+start - +end) / oneDay));
    setCampaignDate(end.toDateString());
    setDays(diffDays);
  };

  /**
   * This function use load donation details on the basis of current currency
   */
  const loadDonations = () => {
    setLoading(true);
    fetch(
      "/api/donation_details?destination_currency=" +
        app.state.current_currency.code
    )
      .then((response) => response.json())
      .then((e) => {
        setDonationDetails(e);
      })
      .finally(() => setLoading(false));
  };

  /**
   * this useeffect run whenever the currentCurrency changes
   */
  useEffect(() => {
    countLeftDays();
  }, []);

  /**
   * this useeffect run whenever the currentCurrency changes
   */
  useEffect(() => {
    loadDonations();
    console.log("yes");
  }, [app.state.current_currency]);

  return (
    <Box
      display="flex"
      gap={[4, 4, 0]}
      my={8}
      rounded={"xl"}
      shadow={"lg"}
      flexDirection={["column", "column", "row"]}
      bg={useColorModeValue("white", "gray.700")}
      overflow="hidden"
    >
      <Flex w={["auto", "auto", "75%"]} minH="full" position={"relative"}>
{/**
 * TODO: Enable this after the video is finalised
 *    
 * {isPlayback ? (
          <AspectRatio ratio={16 / 16} w="full">
            <iframe
              title="naruto"
              src="https://www.youtube.com/embed/aScmJS75dyI?autoplay=1"
              allowFullScreen
            />
          </AspectRatio>
        ) : (
          <>
            <Box
              position={"absolute"}
              height={"100%"}
              width={"100%"}
              display={"flex"}
              justifyContent="center"
              alignContent={"center"}
              alignItems="center"
              bg={useColorModeValue("blackAlpha.400","blackAlpha.400")}
            >
              <IconButton
                bg="none"
                color={useColorModeValue('gray.100', 'white')}
                onClick={() => setPlayback(true)}
                icon={<BiPlayCircle />}
                aria-label="Play video"
                fontSize={"9xl"}
              ></IconButton>
            </Box>
          </>
        )}
 * 
 */}        
        <Image w="full" h="full" src={banner.src} />
      </Flex>
      <Box
        w={["auto", "auto", "auto"]}
        maxW={"350px"}
        mx="auto"
        px={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Spacer />
        <Stack spacing={2} textAlign="center">
          <Box>
            <Skeleton isLoaded={!loading}>
              <Heading color={useColorModeValue("gray.700", "gray.100")}>
                {donationDetails &&
                  formatAmountForDisplay(
                    donationDetails.destination_currency_total / 100,
                    app.state.current_currency.code
                  )}
              </Heading>
            </Skeleton>
            <Skeleton isLoaded={!loading}>
              <Text color={useColorModeValue("gray.500", "gray.400")}>
                {" "}
                Funded of {""}
                {formatAmountForDisplay(
                  RAISING_AMOUNT * app.state.current_currency.value,
                  app.state.current_currency.code
                )}{" "}
              </Text>
            </Skeleton>
          </Box>
          {/** TODO: Raising amount needs to be converted */}
          <Skeleton isLoaded={!loading}>
            {donationDetails && (
              <Progress
                rounded={"lg"}
                size={"md"}
                colorScheme="green"
                value={
                  (donationDetails.destination_currency_total /
                    100 /
                    RAISING_AMOUNT) *
                  100
                }
              />
            )}
          </Skeleton>

          <HStack pt={2} justifyContent={"center"}>
            <Skeleton isLoaded={!loading}>
              <Badge>
                {donationDetails && donationDetails.total_transactions}{" "}
                supporters
              </Badge>
            </Skeleton>
            <Skeleton isLoaded={!loading}>
              <Badge>{days} days left</Badge>
            </Skeleton>
          </HStack>
          <Box py={4} w="full">
            <Button
              w="full"
              size={"lg"}
              shadow="md"
              onClick={onOpen}
              colorScheme="yellow"
              variant="solid"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              rightIcon={<BiDonateHeart />}
            >
              <Text mr={2}>Donate</Text>
            </Button>
            <Text
              mt={2}
              color={useColorModeValue("gray.600", "gray.300")}
              fontSize="xs"
            >
              Safe checkout with Stripe
            </Text>
          </Box>
        </Stack>
        <Spacer />
        <Box mb={6} p={2} textAlign="center">
          <Text fontSize="sm">
            {" "}
            <strong>Partial Funding</strong> this campaign will collect all
            funds raised by {campaignDate}.
          </Text>
        </Box>
      </Box>
      <LevelModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
