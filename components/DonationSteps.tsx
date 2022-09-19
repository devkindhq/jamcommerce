import {
  Box,
  Button, Checkbox,
  Flex,
  FormControl, FormLabel,
  HStack,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useColorModeValue,
  useNumberInput,
  VStack
} from "@chakra-ui/react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { useState } from "react";
import { default as products, Product } from "../data/donation_products";
import DonationBoxRadio from "./DonationBoxRadio";
import DonationCard from "./DonationCard";
import { FormValues } from "./LevelModal";
import RadioGroup from "./RadioGroup";

const CustomErrorMessage = ({ name }: { name: string | undefined }) => (
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
      <Checkbox
        id="anonymous"
        name="anonymous"
        onChange={formik.handleChange}
        isChecked={formik.values.anonymous}
        colorScheme="green"
      >
        I would like to donate as anonymous
      </Checkbox>
    </VStack>
  );
}

export function ChooseLevel() {
  const donationProducts = products().map((e) => {
    const { name } = e;
    return {
      ...e,
      title: name,
    };
  });

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
      {donationProducts.map((props, index) => {
        return <DonationBoxRadio key={index} value={props.id} {...props} />;
      })}
    </RadioGroup>
  );
}

const smileys = [
  { number: 10, value: "😞" },
  { number: 25, value: "😊" },
  { number: 50, value: "😁" },
  { number: 75, value: "😄" },
  { number: 100, value: "😍" },
];
type Smiley = {
  number: number;
  value: string;
};
type Smileys = Smiley[];

export function GoodDeeds() {
  const formik = useFormikContext<FormValues>();
  const formProduct = products().find(
    (product) => product.id == formik.values.product
  );
  if (!formProduct) throw new Error("Something went wrong with the product");
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [currentProduct, setCurrentProduct] = useState<Product>(formProduct);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        step: 5,
        defaultValue: 5,
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
  // useEffect(() => {
  //   let original_price = currentProduct?.original_price || currentProduct?.price
  //   if(!original_price) throw new Error("Something went wrong with the product pricing.")
  //   let product = {
  //     ...currentProduct,
  //     original_price: original_price,
  //     onClick: () => {},
  //     price: original_price  + (formik.values.tip*100)
  //   }
  //   // setCurrentProduct(product)
  // }, [formik.values.tip])

  const findClosestObject = (array: Smileys, number: number) => {
    return array.reduce((a, b, _currentIndex, array): Smiley => {
      let aNumber = typeof a == "object" ? a.number : a;
      let aDiff = Math.abs(aNumber - number);
      let bDiff = Math.abs(b.number - number);
      // blank object
      var result: number = 0;
      if (aDiff == bDiff) {
        // Choose largest vs smallest (> vs <)
        result = a.number > b.number ? b.number : aNumber;
      } else {
        result = bDiff < aDiff ? b.number : aNumber;
      }
      return (
        array.find((e) => e.number == result) ?? { number: 1, value: "😊" }
      );
    });
  };
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
              Most people add little at least 20% extra.{" "}
            </Text>
          </Box>
          {/** TODO: Implement currency here. Add the currency symbol as well */}
          <HStack maxW={["auto", "auto", "200px"]} mt={2}>
            <Button
              {...dec}
              size="lg"
              onContextMenu={(e) => e.preventDefault()}
              colorScheme="blue"
            >
              -
            </Button>
            <Input
              {...input}
              type=""
              bg={useColorModeValue("white", "gray.700")}
              colorScheme="blue"
              size="lg"
            />
            <Button
              {...inc}
              size="lg"
              onContextMenu={(e) => e.preventDefault()}
              colorScheme="blue"
            >
              +
            </Button>
          </HStack>
        </Flex>
        <Flex mt={5}>
          <Box w="full">
            <Slider
              step={5}
              focusThumbOnChange={false}
              value={formik.values.tip}
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
