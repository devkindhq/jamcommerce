import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";

export default function StickyCTA(){
    return(
        <Flex position="fixed" gridGap={4} px={4} py={4} bottom={0} borderTop="1px solid" borderColor={'gray.200'} right={0} bg={useColorModeValue("white","gray.600")} w="full" zIndex={1}>
            <Button w="full" flex={0} px={12} variant="outline" colorScheme="blue" size="lg">
                Share
            </Button>
            <Button w="full" flex={1} colorScheme="yellow" rightIcon={<ArrowForwardIcon />} size="lg">
                Donate
            </Button>
        </Flex>
    )
}