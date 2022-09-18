import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
  NumberInputField,
  NumberInputStepper, Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack
} from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { default as product, default as products } from '../data/donation_products';
import DonationBoxRadio from "./DonationBoxRadio";
import RadioGroup from "./RadioGroup";
export function DonorForm() {
    const formik = useFormikContext();
    return (
        <VStack spacing={4} align="flex-start">
        <FormControl>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            name="name"
            type="name"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
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
        </VStack>)
}

export function ChooseLevel(){
const AVATARS = products.map( e => {
  const { name } = e;
  return {
    ...e,
    title: name
  };
})

type Values = {
  email: string;
  avatar: string;
};
return (
  <RadioGroup name="product" py={2} display="flex" gridColumnGap={2} display="flex" gridGap={4} flexDirection={'column'}> 
  {AVATARS.map((props, index) => {
    return (
    <DonationBoxRadio key={index}  value={props.id} {...props} />
  )})}
</RadioGroup>
)
}

export function GoodDeeds(){
  const formik = useFormikContext();
  const currentProduct = product.find(product => product.id == formik.values.product);
  const handleChange = (value) => formik.setFieldValue('tip', value)
  debugger;
  return (
    <Flex minW={'300px'}>
      <NumberInput maxW='100px' mr='2rem' value={formik.values.tip} onChange={handleChange} step={5}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        flex='1'
        step={5}
        focusThumbOnChange={false}
        value={formik.values.tip}
        onChange={handleChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize='sm' boxSize='32px' children={formik.values.tip} />
      </Slider>
    </Flex>
  )
}

