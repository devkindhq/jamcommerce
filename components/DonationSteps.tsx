import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
  NumberInputField,
  NumberInputStepper, Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
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
    let original_price = currentProduct?.original_price || currentProduct.price
    let product = {
      ...currentProduct,
      original_price: original_price,
      onClick: () => {},
      price: original_price  + (formik.values.tip*100)
    }
    setCurrentProduct( product)
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
  <HStack justifyContent={'space-between'}>
  <Box>
  <Text mt={4} fontSize="xl" fontWeight={'600'}> Add a little something extra </Text>
  <Text fontSize="md"> Most people add little at least 20% extra. </Text>
  </Box>
  {/** TODO: Implement currency here. Add the currency symbol as well */}
  <NumberInput size="lg" maxW='100px' onFocus={() =>{}} mt={0}  mr='2rem' value={formik.values.tip} onChange={handleChange} step={5} min={0} max={100} >
      <NumberInputField mt={0} />
      <NumberInputStepper m={0} onFocus={() =>{}}>
        <NumberIncrementStepper mt={3} onFocus={() =>{}} />
        <NumberDecrementStepper mt={0} onFocus={() =>{}} />
      </NumberInputStepper>
    </NumberInput>
  </HStack>

  <Flex minW={'300px'} mt={5}>
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

