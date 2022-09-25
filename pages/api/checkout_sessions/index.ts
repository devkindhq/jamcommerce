import { NextApiRequest, NextApiResponse } from 'next'

import {  MIN_AMOUNT, MAX_AMOUNT } from '../../../config'
import { formatAmountForStripe } from '../../../utils/stripe-helpers'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const amount: number = req.body.amount
    const name: string = req.body.name ?? ''
    const email: string = req.body.customer_email || null
    const currency: string = req.body.currency || null
    const anonymous: string = req.body.anonymous ?? false
    const line_items: [{}] = req.body.line_items ?? [
      {
        name: 'Custom amount donation',
        amount: formatAmountForStripe(amount, currency.toUpperCase()),
        currency: currency.toUpperCase(),
        quantity: 1,
      },
    ];
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.')
      }
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        metadata: {
          name: name,
          anonymous: anonymous,
          email: email,
          currency: currency
        },

        ...(email && {customer_email: email}),
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: line_items,
        success_url: `${req.headers.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?status=cancelled&currency=${currency}`,
      }
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
