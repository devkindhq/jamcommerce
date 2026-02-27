import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { formatAmountForStripe } from '../../../../utils/stripe-helpers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
})

const MIN_AMOUNT = 1
const MAX_AMOUNT = 1000000

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { slug } = req.query
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Campaign slug is required' })
  }

  const { amount, currency, customer_email } = req.body

  if (!amount || !currency) {
    return res.status(400).json({ error: 'amount and currency are required' })
  }

  const numericAmount = Number(amount)
  if (isNaN(numericAmount) || numericAmount < MIN_AMOUNT || numericAmount > MAX_AMOUNT) {
    return res.status(400).json({ error: `Amount must be between ${MIN_AMOUNT} and ${MAX_AMOUNT}` })
  }

  try {
    // Fetch campaign to confirm it exists and is active
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (url && key) {
      const supabase = createClient(url, key)
      const { data: campaign } = await supabase
        .from('campaigns')
        .select('id, title, status')
        .eq('slug', slug)
        .single()

      if (!campaign || campaign.status !== 'active') {
        return res.status(404).json({ error: 'Campaign not found or no longer active' })
      }
    }

    const stripeAmount = formatAmountForStripe(numericAmount, currency.toUpperCase())

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: 'donate',
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'Donation',
          amount: stripeAmount,
          currency: currency.toUpperCase(),
          quantity: 1,
        },
      ],
      metadata: {
        campaign_id: slug,
        currency: currency,
      },
      ...(customer_email && { customer_email }),
      success_url: `${req.headers.origin}/c/${slug}?status=success`,
      cancel_url: `${req.headers.origin}/c/${slug}?status=cancelled`,
    }

    const session = await stripe.checkout.sessions.create(params)
    return res.status(200).json(session)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return res.status(500).json({ error: message })
  }
}
