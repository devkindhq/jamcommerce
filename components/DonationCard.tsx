import {
  Box, Flex, Heading, Image, LinkBox, Stack, Text, useColorModeValue
} from '@chakra-ui/react';
import { useContext } from 'react';
import { formatCurrencyString } from 'use-shopping-cart';
import AppContext from '../context/app-context';
import { Product } from '../data/donation_products';
import { formatAmountForDisplay, formatAmountFromStripe } from '../utils/stripe-helpers';

type DonationCardProps = {
  onClick?: (() => void) | undefined
  image?: string
  name?: string
  description?: string
  price?: number
  count?: number
  id: string
}

export default function DonationCard({ onClick, image = '', name = 'One meal for a family', description = 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.', price = 10, count = 2, id }: DonationCardProps) {
const app = useContext(AppContext);
  return (
    <LinkBox onClick={() => onClick && onClick()} cursor="pointer">
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.700')}
        transition="all 0.3s"
        _hover={{
          background: useColorModeValue('gray.50', 'gray.800'),
          transform: 'scale(1.01)',
          borderColor: useColorModeValue('gray.300', 'blue.800')
        }}
        boxShadow={'md'}
        rounded={'md'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        overflow={'hidden'}>
        <Flex display="none">
          <Image
            boxSize='100px'
            height="auto"
            src={image
            }
            alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>
        <Box p={6}>
          <Stack spacing={2}>
            {id && id == 'custom' && (<Text>Starting from</Text>)}
            <Heading  fontSize={'2xl'} color={useColorModeValue('gray.800', 'gray.200')} fontWeight={600} fontFamily={'body'}>
              {formatAmountForDisplay((formatAmountFromStripe(price, app.state.current_currency.code)) * app.state.current_currency.value, app.state.current_currency.code)}
            </Heading>

              <Heading fontSize={'lg'} fontWeight={600} color={useColorModeValue('gray.700', 'gray.300')} fontFamily={'body'}>
              {name}
            </Heading>
       
            <Text  color={useColorModeValue('gray.500', 'gray.400')} fontSize='sm'>{description}</Text>
          </Stack>
            {/* 
            TODO: Create some function to calculate the line items from checkout and show here
            <Text color={'gray.500'} mt={4} fontSize='xs'>{count} claimed</Text> */}
        </Box>
      </Box>
      </LinkBox>
  );
}