import {
  Box,
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
import { useEffect, useState } from "react";
import { default as product, default as products } from '../data/donation_products';
import DonationBoxRadio from "./DonationBoxRadio";
import DonationCard from "./DonationCard";
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

const smileys = [
  {number: 10, value: '😞'},
  {number: 25, value: '😊'},
  {number: 50, value: '😁'},
  {number: 75, value: '😄'},
  {number: 100, value: '😍'},
]
export function GoodDeeds(){
  const formik = useFormikContext();
  const formProduct = product.find(product => product.id == formik.values.product);
  const [currentProduct, setCurrentProduct] = useState(formProduct)

  const handleChange = (value) => formik.setFieldValue('tip', value)
  useEffect(() => {
    let original_price = currentProduct?.original_price
    let product = {
      ...currentProduct,
      original_price: original_price,
    }
    setCurrentProduct( e => ({
      ...product,
      price: e.original_price ?? e.price ?? 0 + (formik.values.tip*100)
    }))
  }, [formik.values.tip])
  
  const findClosestObject = (array, number) => {
      return array.reduce((a, b, currentIndex, array) => {
          let aNumber = typeof a == 'object' ? a.number : a 
          let aDiff = Math.abs(aNumber - number);
          let bDiff = Math.abs(b.number - number);
          var result = null;
          if (aDiff == bDiff) {
              // Choose largest vs smallest (> vs <)
              result = a.number > b.number ?b.number :  aNumber ;
          } else {
              result = bDiff < aDiff ? b.number : aNumber;
          }
          return array.find(e => e.number == result)
      });
  }
  return (
 <Box>
  <DonationCard {...currentProduct} />
  <Flex minW={'300px'} mt={5}>
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
      <SliderThumb fontSize='sm' boxSize='32px'>
        <Box>
          {findClosestObject(smileys, formik.values.tip).value}
        </Box>
        </SliderThumb>
    </Slider>
  </Flex>
 </Box>
  )
}

