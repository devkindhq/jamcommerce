import { LinkIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { useContext } from "react";
import AppContext from "../context/app-context";
import { social_links } from "../data/social_links";

import { formatAmountForDisplay } from "../utils/stripe-helpers";

const copyURL = async () => {
    await navigator.clipboard.writeText(location.href);
}
export default function ShareCard() {
    const app = useContext(AppContext)
    const ShareButtons = () => {
        return(
            <Flex mt={4} gridGap={2}>
            {social_links.map(social_link => {
                return (<IconButton rounded={'full'} fontSize={'2xl'} icon={social_link.icon} colorScheme={social_link.colorScheme ?? 'pink'} aria-label={social_link.label} />)
            })}
            <IconButton rounded={'full'} icon={<LinkIcon />} colorScheme='yellow' onClick={copyURL} aria-label="Copy link" />
        </Flex>
        )
    }
    return (
        <Box bgColor={useColorModeValue('blue.50','blue.900')} rounded="lg" p={9}>
            <Flex justifyContent={'space-between'} direction={'row'} alignItems='center' flexWrap={'wrap'}>
            <Box>
            <Text fontSize={'3xl'} fontWeight={'semibold'} color={useColorModeValue('gray.700','white')}>Your share could raise {formatAmountForDisplay(61 * app.state.current_currency.value, app.state.current_currency.code)}</Text>
            <Text fontSize={'xl'} fontWeight={'semibold'} color={useColorModeValue('gray.700','white')}>Invite your friends and family to donate.</Text>
            <ShareButtons  />
            </Box>
            </Flex>
        </Box>
    )
}