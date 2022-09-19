
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import {
  IconButton,
  Box, Button, Collapse, Flex, Icon, Image, Link,
  Popover, PopoverContent, PopoverTrigger, Select, Stack, Text, useBreakpointValue, useColorMode, useColorModeValue, useDisclosure, Divider
} from '@chakra-ui/react';
import { useContext } from 'react';
import { BASE_CURRENCY, DEALING_CURRENCIES } from '../config';
import AppContext from '../context/app-context';
import logoDark from '../public/logo-dark.svg';
import logoLight from '../public/logo.svg';
export default function Header() {
  const logo = useColorModeValue(logoLight, logoDark)
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const app = useContext(AppContext);


  /**
   * Functions run to updØate currency when ever use select from the list currency
   * 
   * @param e
   */
  const handleChange = (e: any) => {
    app.changeCurrency(e.target.value)
  }

  return (
    <Box borderBottom={1}
    borderStyle={'solid'}
    shadow="sm"
    bg={useColorModeValue('white', 'gray.800')}
    borderColor={useColorModeValue('gray.100', 'gray.900')} position="fixed" w="full" top={0} zIndex={1}>
      <Box bg={useColorModeValue("gray.100", "gray.900")} w="full"
      display={{ base: 'block', md: 'none' }}
      >
        <Box maxW={"7xl"} mx="auto" w="full">
          <Flex
            justifyContent={"space-between"}
            w="full"
            py={{ base: 2 }}
            px={{ base: 4 }}
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
          >
            <Button onClick={toggleColorMode} bg="none">
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Select
              maxW={"100px"}
              variant={"filled"}
              bg={useColorModeValue("white", "gray.700")}
              onChange={handleChange}
              defaultValue={BASE_CURRENCY}
            >
              {DEALING_CURRENCIES.map((currency, index) => {
                return (
                  <option key={index} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </Select>
          </Flex>
        </Box>
      </Box>
    
    <Box maxW={'7xl'} mx="auto">
      <Flex
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}

        align={'center'}>
        {/* <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex> */}
        <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            <Image src={logo.src} maxW={[32,40]} my={2} />

          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={2}>
            <Select 
            display={{ base: 'none', md: 'flex' }}
            onChange={handleChange} defaultValue={BASE_CURRENCY}>
              {DEALING_CURRENCIES.map((currency, index) => {
                return (
                  <option key={index} value={currency}>{currency}</option>
                )
              })}
            </Select>
            <Button onClick={toggleColorMode} bg="none"
            display={{ base: 'none', md: 'block' }}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button
              fontWeight={600}
              colorScheme="green"
              px={12}
              onClick={() => (console.log('donate'))}>
              Donate
            </Button>

        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav handleChange={handleChange} />
      </Collapse>
    </Box> 
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  return null;
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({handleChange}: {handleChange: (e: any) => void}) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      <Text>Change currency</Text>
      <Select 
        onChange={handleChange} defaultValue={BASE_CURRENCY}>
          {DEALING_CURRENCIES.map((currency, index) => {
            return (
              <option key={index} value={currency}>{currency}</option>
            )
          })}
      </Select>
      {/* {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))} */}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Inspiration',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: 'Find Work',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
];