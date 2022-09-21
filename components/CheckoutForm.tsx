import React, { useContext, useState } from 'react'

import CustomDonationInput from '../components/CustomDonationInput'

import { Heading, useColorModeValue } from '@chakra-ui/react'
import { Product } from 'use-shopping-cart'
import * as config from '../config'
import AppContext from '../context/app-context'
import { CurrencyObject } from '../providers/app-provider'
import customCheckoutRedirect, { customAmountCheckoutRedict } from '../utils/stripe-checkout'
import { formatAmountForDisplay, formatAmountForStripe } from '../utils/stripe-helpers'
import ProductsNew from './ProductsNew'

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  })
  const app = useContext(AppContext);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    await customAmountCheckoutRedict(input.customDonation);
    setLoading(false)
  }

  const changeProductCurrency = (product: Product, currency: CurrencyObject) => {
    return {
      ...product,
      currency: currency.code,
      price: formatAmountForStripe((product.price/100) * currency.value, currency.code)
    }
  }
  const handleSingleProduct = async (product: Product) => {
    setLoading(true)
    // TODO: this the input.customDonation since we don't need custom donation here.
    const convertProduct = changeProductCurrency(product, app.state.current_currency)
    await customCheckoutRedirect(convertProduct, input.customDonation, app.state.current_currency.code);
    setLoading(false)
  }

  return (
    <>
    <Heading size="lg" mb={4} color={useColorModeValue('gray.700', 'gray.200')}>Giving levels</Heading>
    <ProductsNew handleBuyNow={handleSingleProduct} />
    </>
  )
}

export default CheckoutForm
