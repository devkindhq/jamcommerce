import {
    Box, Flex, Heading, Image, LinkBox, Stack, Text, useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import { formatCurrencyString } from 'use-shopping-cart';
import * as config from '../config';
import { formatAmountForDisplay } from '../utils/stripe-helpers';
// TODO: look how to define a ts function for onclick
export default function DonationCard({onClick  ,image = '', name = 'One meal for a family', description = 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.', price = 10, count = 2}) {
  return (
    <LinkBox onClick={() => onClick()} cursor="pointer">
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'md'}
        rounded={'md'}
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
            <Heading  fontSize={'2xl'} color="gray.800" fontWeight={600} fontFamily={'body'}>
              {formatCurrencyString(
                {
                  value: price,
                  currency: config.CURRENCY,
                }
                )}
            </Heading>

              <Heading fontSize={'lg'} fontWeight={600} color="gray.700" fontFamily={'body'}>
              {name}
            </Heading>
       
            <Text color={'gray.500'} fontSize='sm'>{description}</Text>
          </Stack>
            <Text color={'gray.500'} mt={4} fontSize='xs'>{count} claimed</Text>
        </Box>
      </Box>
      </LinkBox>
  );
}