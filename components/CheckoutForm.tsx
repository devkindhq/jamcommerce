import React, { useState } from 'react'

import CustomDonationInput from '../components/CustomDonationInput'
import StripeTestCards from '../components/StripeTestCards'

import { Product } from 'use-shopping-cart'
import * as config from '../config'
import { fetchPostJSON } from '../utils/api-helpers'
import getStripe from '../utils/get-stripejs'
import { formatAmountForDisplay } from '../utils/stripe-helpers'
import ProductsNew from './ProductsNew'
import { Heading } from '@chakra-ui/react'

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  })

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: input.customDonation,
    })

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,

      // TODO: Send user email if known
      // TODO: Send user name if known
      // TODO: Send line items if possible? giving levels are line items perhaps?
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
    setLoading(false)
  }

  const getStripeProduct = (product: Product) => {
    return {
      name: product.name,
      currency: product.currency,
      description: product.description,
      amount: product.price,
      images: [product.image],
      quantity: 1
    }
  }
  const handleSingleProduct = async (product: Product) => {
    debugger;
    setLoading(true)
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: input.customDonation,
      line_items: [getStripeProduct(product)]
    })

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,  
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
    setLoading(false)
  }

  return (
    <>
    {/** TODO: Add contact module here */}
    <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
      <CustomDonationInput
        className="checkout-style"
        name={'customDonation'}
        value={input.customDonation}
        min={config.MIN_AMOUNT}
        max={config.MAX_AMOUNT}
        step={config.AMOUNT_STEP}
        currency={config.CURRENCY}
        onChange={handleInputChange}
      />
      <button
        className="checkout-style-background"
        type="submit"
        disabled={loading}
      >
        Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
      </button>

    </form>
    <Heading color="gray.700" size="lg" mb={4}>Giving levels</Heading>
    <ProductsNew buyNow={true} handleBuyNow={handleSingleProduct} />
    </>
  )
}

export default CheckoutForm
