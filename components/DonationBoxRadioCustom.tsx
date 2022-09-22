import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box, Button, chakra, Flex, HStack, ImageProps, Input, Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack, Text, useColorModeValue, useNumberInput, useRadio, useRadioGroupContext, UseRadioProps
} from "@chakra-ui/react";
import { FormikValues, useField, useFormikContext } from "formik";
import * as React from "react";
import { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import AppContext from "../context/app-context";
import { default as products, Product } from "../data/donation_products";
import { findClosestObject, smileys } from "../utils/smiley";
import { formatAmountForDisplay, formatAmountFromStripe } from "../utils/stripe-helpers";
import { CustomErrorMessage } from "./DonationSteps";

type Props = UseRadioProps &
  ImageProps & {
    image: string;
    item: any;
  } & Product;

const DonationRadioBoxCustom = React.forwardRef((props: Props, ref) => {
  const { image, name, item, ...radioProps } = props;
  const formik = useFormikContext<FormikValues>();
  const customProduct = formik.values.customProduct ?? products().find( e => e.id == 'custom');
  const group = useRadioGroupContext();
  const stepperInput = {
    step: 1000,
    min: customProduct.min_price,
    max: customProduct.max_price
  }
  let isChecked = group.value.toString() === props?.value?.toString();
  const [price, setPrice] = useState(formik?.values?.customProduct?.price ?? stepperInput.min);
  const [{ checked, ...field }] = useField({
    name: name ?? 'product',
    type: "radio",
    value: radioProps?.value?.toString(),
    checked: isChecked,
  });
  const app = React.useContext(AppContext);
  const parseCustomProduct = (product: Product, price: number): Product => {
    return {
      ...product,
      price: price
    }
  }
  React.useEffect(() => {
    if(isChecked == true && customProduct?.id) {
      const modifiedProduct = parseCustomProduct(customProduct, price)
      formik.setFieldValue("customProduct", modifiedProduct);
    }
    else {
    formik.setFieldValue("customProduct", null);
    }
    () => console.log('all off')
  }, [isChecked, price])

  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio({
      isChecked: isChecked,
      ...field,
    });

  const handleChange = (value: number) => {
    setPrice(value)
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { getInputProps: getNumberInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        isDisabled: !state.isChecked,
        step: stepperInput.step,
        defaultValue: 0,
        min: stepperInput.min,
        max: stepperInput.max, // TODO: Fix this on the basis of currency. This depends on currency selected. e.g. 100+ IDR is nothing.
        precision: 0,
        value: price,
        onChange: (e) => handleChange(parseInt(e)),
        name: 'customProduct'
      }),
    inc = getIncrementButtonProps(),
    dec = getDecrementButtonProps(),
    input = getNumberInputProps();
  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({}, ref)} hidden />
      <Box
        {...getCheckboxProps()}
        w="full"
        rounded="md"
        shadow="md"
        borderWidth={2}
        borderStyle="solid"
        transition="all 0.3s"
        borderColor={state.isChecked ? useColorModeValue('green.500', 'green.600') : useColorModeValue('gray.200', 'gray.600')}
        py={2}
        px={4}
        position="relative"
      >
        <Box {...getLabelProps()}>
          <HStack justifyContent={"space-between"} alignItems={'flex-start'}>
            <Box>
            <Box >
              <Text fontSize={"2xl"} fontWeight={"500"}>
              {formatAmountForDisplay((formatAmountFromStripe(price, app.state.current_currency.code)) * app.state.current_currency.value, app.state.current_currency.code)}
              </Text>
            </Box>
              <Text fontWeight={"500"}>{radioProps.title}</Text>
              <Text fontSize={"sm"}>{radioProps.description}</Text>
            </Box>
            {state.isChecked ? <CheckCircleIcon color={useColorModeValue('green.500', 'green.400')} fontSize="xl" /> :  <Box borderWidth={1} boxSize="xl" shadow="sm"  borderColor={useColorModeValue('gray.200', 'gray.600')} minW={5} minH={1} w={5} h={5} rounded="full"></Box>}
          </HStack>
          <HStack

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
              fontSize={'4xl'}
            >
              <FaMinusCircle />
            </Button>
              <Input
                {...input}
                value={price}
                type="hidden"
                bg={useColorModeValue("white", "gray.700")}
                colorScheme="blue"
                size="lg"
              />
              <Input
                readOnly
                value={formatAmountForDisplay(price*app.state.current_currency.value/100, app.state.current_currency.code)}
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
              fontSize={'4xl'}
            >
              <FaPlusCircle />
            </Button>
          </HStack>
        <Flex mt={5}>
          <Box w="full" px={4}>
            <Slider
              focusThumbOnChange={false}
              step={stepperInput.step}
              value={price}
              min={stepperInput.min}
              max={stepperInput.max}
              onChange={handleChange}
              isDisabled={!state.isChecked}
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
                  {findClosestObject(smileys, (formik?.values?.customProduct?.price/stepperInput.max)*100 ?? 0).value}
                </Box>
              </SliderThumb>
            </Slider>
          </Box>
        </Flex>
        <CustomErrorMessage name="customProduct" />
        <CustomErrorMessage name="custom_product" />
      </Box>
      </Box>
    </chakra.label>
  );
});

export default DonationRadioBoxCustom;
