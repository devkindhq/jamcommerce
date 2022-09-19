import {
    Avatar,
    Box,
    chakra,
    Container,
    Flex,
    HStack,
    Icon,
    SimpleGrid,
    useColorModeValue,
  } from '@chakra-ui/react';
import { BiBulb } from 'react-icons/bi';

interface TestimonialCardProps {
    title: string;
    content?: string;
    index: number;
    children: JSX.Element
  }
  
  export default function TransactionCard(props: TestimonialCardProps) {

    const backgrounds = [
      `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%2332915'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2332915f'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%2332915f'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
      `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%2337a169'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2337a169'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
      `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2332915f'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%2337a169'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2337a169'/%3E%3C/svg%3E")`,
    ];
    const { title, children, index } = props;
    return (
      <Flex
        boxShadow={'xl'}
        direction={{ base: 'column-reverse', md: 'row' }}
        rounded={'xl'}
        p={8}
        justifyContent={'center'}
        position={'relative'}
        bg={useColorModeValue('white', 'gray.700')}
        borderWidth={2}
        borderStyle={'dashed'}
        borderColor={useColorModeValue('gray.500', 'gray.700')}
        _before={{
          content: '""',
          position: 'absolute',
          zIndex: '-1',
          height: 'full',
          maxW: '1040px',
          width: 'full',
          filter: 'blur(40px)',
          transform: 'scale(0.9)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          top: 0,
          left: 0,
          backgroundImage: backgrounds[index % 4],
        }}>
        <Flex
          direction={'column'}
          textAlign={'left'}>
            <Box>
            <HStack color={useColorModeValue('gray.800', 'white')}>
            <chakra.p fontWeight={'bold'} fontSize={'2xl'}> {title}</chakra.p>
              </HStack>
            </Box>
            {children}
        </Flex>
      </Flex>
    );
  }