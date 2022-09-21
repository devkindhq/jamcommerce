import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Slide, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useScroll, useViewportScroll } from "framer-motion";
import { useContext, useState } from "react";
import { BiDonateHeart, BiShare } from "react-icons/bi";
import { FaCreativeCommonsShare, FaShare } from "react-icons/fa";
import AppContext from "../context/app-context";

export default function StickyCTA(){
    const { scrollY } = useScroll();
    const [show, setShow] = useState(false)
    const app = useContext(AppContext);
    scrollY.onChange( y => y > 500 ? setShow(true) : setShow(false))
    return(
        <Box position={'relative'} zIndex={1}>
        <Slide direction='bottom' in={show}>
        <Flex gridGap={4} px={4} py={4}  position="relative" bottom={0} borderTop="1px solid" borderColor={useColorModeValue("white","gray.800")} right={0} bg={useColorModeValue("white","gray.700")} w="full">
            <Button w="full" flex={0} px={12} variant="outline" colorScheme="blue" size="lg" leftIcon={<BiShare />}>
                Share
            </Button>
            <Button w="full" flex={1} colorScheme="yellow" rightIcon={<BiDonateHeart />} size="lg" onClick={() => app.onPopupOpen()}>
                Donate
            </Button>
        </Flex>
        </Slide>
        </Box>

    )
}