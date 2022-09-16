import {
    Box, Heading, Stack, Text, useColorModeValue
} from '@chakra-ui/react';
import * as config from '../config';
import { formatAmountForDisplay } from '../utils/stripe-helpers';

export default function DonationCard({title = 'One meal for a family', description = 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.', amount = 10, count = 2}) {
  return (
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        {/* <Flex>
          <Image
            boxSize='100px'
            height="auto"
            src={
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex> */}
        <Box p={6}>
          <Stack spacing={2}>
            <Heading  fontSize={'2xl'} color="gray.800" fontWeight={600} fontFamily={'body'}>
              {formatAmountForDisplay(amount, config.CURRENCY)}
            </Heading>
            <Heading fontSize={'lg'} fontWeight={600} color="gray.700" fontFamily={'body'}>
              {title}
            </Heading>
            <Text color={'gray.500'} fontSize='sm'>{description}</Text>
          </Stack>
            <Text color={'gray.500'} mt={4} fontSize='xs'>{count} claimed</Text>
        </Box>
      </Box>
  
  );
}