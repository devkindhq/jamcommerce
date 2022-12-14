import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  useColorModeValue,
  useNumberInput,
  VStack
} from "@chakra-ui/react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { useContext, useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import AppContext from "../context/app-context";
import { default as products, Product } from "../data/donation_products";
import { findClosestObject, smileys } from "../utils/smiley";
import CurrencySelector from "./CurrencySelector";
import DonationBoxRadio from "./DonationBoxRadio";
import DonationRadioBoxCustom from "./DonationBoxRadioCustom";
import DonationCard from "./DonationCard";
import { FormValues } from "./LevelModal";
import RadioGroup from "./RadioGroup";

export const CustomErrorMessage = ({ name }: { name: string | undefined }) => (
  <Text color="red" fontSize="xs" mt={1}>
    {/** @ts-ignore */}
    <ErrorMessage name={name} />
  </Text>
);
export function DonorForm() {
  const formik = useFormikContext<FormValues>();

  return (
    <VStack spacing={4} align="flex-start" minW={["auto", "sm"]} maxW="full">
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Field
          as={Input}
          id="name"
          name="name"
          type="name"
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.name}
          isDisabled={formik.values.anonymous}
          // @ts-ignore
          isInvalid={formik?.touched?.name && formik?.errors?.name}
        />
        <CustomErrorMessage name="name" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email Address</FormLabel>
        <Field
          as={Input}
          id="email"
          name="email"
          type="email"
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.email}
          isDisabled={formik.values.anonymous}
          //@ts-ignore
          isInvalid={formik?.touched?.email && formik?.errors?.email}
        />
        <CustomErrorMessage name={"email"} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="currency">Currency</FormLabel>
        <CurrencySelector size={"md"} mb={5} />
        <CustomErrorMessage name={"currency"} />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="anonymous" mb="0">
          I would like to donate anonymously
        </FormLabel>
        <Switch
          id="anonymous"
          name="anonymous"
          onChange={formik.handleChange}
          isChecked={formik.values.anonymous}
          colorScheme="yellow"
        />
      </FormControl>
    </VStack>
  );
}

export function ChooseLevel() {
  const app = useContext(AppContext);
  const donationProducts = products().map((e) => {
    const { name } = e;
    return {
      ...e,
      title: name,
    };
  });

  function swapSelectedProduct(products: Product[]){
    const customIndex = products.findIndex( e => e.id == app.state.selectedProduct),
    element = products.splice(customIndex, 1)[0];
    products.splice(0, 0, element);
    return products;
}

  type Values = {
    email: string;
    avatar: string;
  };
  return (
    <RadioGroup
      name="product"
      py={2}
      display="flex"
      gridColumnGap={2}
      gridGap={4}
      flexDirection={"column"}
    >
      {swapSelectedProduct(donationProducts).map((props, index) => {
        if(props.id == 'custom') return <DonationRadioBoxCustom key={index} value={props.id} {...props} />
        return <DonationBoxRadio key={index} value={props.id} {...props} />;
      })}
    </RadioGroup>
  );
}

export function GoodDeeds() {
  const formik = useFormikContext<FormValues>();
  const formProduct = formik.values.customProduct ?? products().find(
    (product) => product.id == formik.values.product
  );
  if (!formProduct) throw new Error("Something went wrong with the product");
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [currentProduct, setCurrentProduct] = useState<Product>(formProduct);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        step: 10,
        defaultValue: 0,
        min: 0,
        max: 100, // TODO: Fix this on the basis of currency. This depends on currency selected. e.g. 100+ IDR is nothing.
        precision: 0,
        value: formik.values.tip,
        onChange: (e) => handleChange(parseInt(e)),
      }),
    inc = getIncrementButtonProps(),
    dec = getDecrementButtonProps(),
    input = getInputProps();

  const handleChange = (value: number) => formik.setFieldValue("tip", value);

  return (
    <Box>
      <DonationCard {...currentProduct} />
      <Box
        bg={useColorModeValue("blue.50", "gray.700")}
        borderWidth={1}
        my={6}
        p={4}
        px={6}
        rounded="lg"
      >
        <Flex
          direction={["column", "column", "row"]}
          justifyContent={"space-between"}
          gap={2}
        >
          <Box>
            <Text mt={4} fontSize="xl" fontWeight={"600"}>
              {" "}
              Add a little something extra?
            </Text>
            <Text fontSize="md">
              {" "}
              Most people add little at least 20% extra. Drag the smiley to adjust.
            </Text>
          </Box>
          {/** TODO: Implement currency here. Add the currency symbol as well */}
          <HStack
            maxW={["16em"]}
            justifyContent="center"
            alignItems={"center"}
            justify="center"
            mt={2}
          >
            <Button
              {...dec}
              size="lg"
              onContextMenu={(e) => e.preventDefault()}
              colorScheme="blue"
              fontSize={'6xl'}
              sx={{
                '@media (max-width: 410px)': {
                  display: 'none',
                },
              }}
            >
              <FaMinusCircle />
            </Button>
            <InputGroup >
              <Input
                {...input}
                type=""
                bg={useColorModeValue("white", "gray.700")}
                colorScheme="blue"
                size="lg"
              />
              <InputRightElement
                pointerEvents="none"
                color={useColorModeValue("gray.700", "white")}
                fontSize="1.2em"
                mt={1}
                p={0}
                children="%"
              />
            </InputGroup>
            <Button
              {...inc}
              size="lg"
              onContextMenu={(e) => e.preventDefault()}
              colorScheme="blue"
              fontSize={'6xl'}
              sx={{
                '@media (max-width: 410px)': {
                  display: 'none',
                },
              }}
            >
              <FaPlusCircle />
            </Button>
          </HStack>
        </Flex>
        <Flex mt={5}>
          <Box w="full">
            <Slider
              focusThumbOnChange={false}
              step={5}
              value={formik.values.tip}
              max={100}
              onChange={handleChange}
            >
              <SliderTrack>
                <SliderFilledTrack bg="pink.500" />
              </SliderTrack>
              <SliderThumb
                fontSize="sm"
                boxSize="32px"
                bg={useColorModeValue("white", "gray.700")}
              >
                <Box fontSize={"2xl"}>
                  {findClosestObject(smileys, formik.values.tip).value}
                </Box>
              </SliderThumb>
            </Slider>
          </Box>
        </Flex>
        <CustomErrorMessage name="tip" />
      </Box>
    </Box>
  );
}
