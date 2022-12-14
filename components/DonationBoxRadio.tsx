import { CheckCircleIcon } from "@chakra-ui/icons";
import {
    Box, chakra, HStack, ImageProps, Text, useColorModeValue, useRadio, useRadioGroupContext, UseRadioProps
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";
import { formatCurrencyString, Product } from "use-shopping-cart";
import AppContext from "../context/app-context";
import { formatAmountForDisplay, formatAmountFromStripe } from "../utils/stripe-helpers";

type Props = UseRadioProps &
  ImageProps & {
    image: string;
    item: any;
  } & Product;

const DonationBoxRadio = React.forwardRef((props: Props, ref) => {
  const { image, name, item, ...radioProps } = props;
  const group = useRadioGroupContext();
  let isChecked = group.value.toString() === props?.value?.toString();

  const [{ checked, ...field }] = useField({
    name: name ?? 'product',
    type: "radio",
    value: radioProps?.value?.toString(),
    checked: isChecked,
  });

  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio({
      isChecked: isChecked,
      ...field,
    });
  const app = React.useContext(AppContext);
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
              {formatAmountForDisplay((formatAmountFromStripe(radioProps.price, app.state.current_currency.code)) * app.state.current_currency.value, app.state.current_currency.code)}
              </Text>
            </Box>
              <Text fontWeight={"500"}>{radioProps.title}</Text>
              <Text fontSize={"sm"}>{radioProps.description}</Text>
            </Box>
            {state.isChecked ? <CheckCircleIcon color={useColorModeValue('green.500', 'green.400')} fontSize="xl" /> :  <Box borderWidth={1} boxSize="xl" shadow="sm"  borderColor={useColorModeValue('gray.200', 'gray.600')} minW={5} minH={1} w={5} h={5} rounded="full"></Box>}
          </HStack>
        </Box>
      </Box>
    </chakra.label>
  );
});

export default DonationBoxRadio;
