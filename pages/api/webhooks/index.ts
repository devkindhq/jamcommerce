import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { convertRateToBase } from './../currency/convert/index';

import Stripe from 'stripe';
import supabase from '../../../utils/supabaseClient';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

const addBaseCurrency = async (checkout_session: any) => {
  const currencyRates = await convertRateToBase(checkout_session.currency, checkout_session.amount_total);
  return {
    ...checkout_session,
    base_currency: currencyRates.data.currency,
    base_currency_amount_total: currencyRates.data.amount
  }
}

const parseCheckoutSession = (checkout_session: any) => {
  return {
    stripe_id: checkout_session.id,
    amount_total: checkout_session.amount_total,
    customer_details: checkout_session.customer_details,
    status: checkout_session.status,
    payment_status: checkout_session.payment_status,
    metadata: checkout_session.metadata,
    line_items: checkout_session.line_items,
    currency: checkout_session.currency,
    base_currency: checkout_session.base_currency,
    base_currency_amount_total: checkout_session.base_currency_amount_total
  }
};
const insertCheckoutSession = async (checkout_session: any) => {
  return supabase.from('checkout_sessions').insert(parseCheckoutSession(checkout_session));
}
const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err)
      console.log(`❌ Error message: ${errorMessage}`)
      res.status(400).send(`Webhook Error: ${errorMessage}`)
      return
    }

    // Successfully constructed event.
    console.log('✅ Success:', event.id)

    // Cast event data to Stripe object.
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`)
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      )
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge
      console.log(`💵 Charge id: ${charge.id}`)
    } 
    else  if (event.type === 'checkout.session.completed') {
      const checkout = event.data.object
      // @ts-ignore
      const checkout_with_line_items = await stripe.checkout.sessions.retrieve(checkout?.id, {
        expand: ['line_items'],
      })
      const checkoutWithBaseCurrencies = await addBaseCurrency(checkout_with_line_items)
      const insert = await insertCheckoutSession(checkoutWithBaseCurrencies);
      if(insert.status == 201 || insert.status == 200) console.info('✅ Checkout session created in database')
    }
    else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default cors(webhookHandler as any)
