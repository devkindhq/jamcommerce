import { Product } from 'use-shopping-cart'
import { parseStripeProduct } from './stripe-helpers'
import { fetchPostJSON } from './api-helpers'
import getStripe from './get-stripejs'

type CheckoutRedirect = {
  product: Product, 
  amount: number
}
async function customCheckoutRedirect({product, amount}: CheckoutRedirect): Promise<any> {
  
    const parsedProduct = await parseStripeProduct(product)
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: amount,
      line_items: [parsedProduct]
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
  }

export default customCheckoutRedirect