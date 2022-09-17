import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js'
import { convertRate } from '../currency/convert';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    try {
        const {destination_currency} = req.query;
        const result = await supabase.from('checkout_sessions').select('*').eq('payment_status', 'paid');
        const baseTotal = result.data?.reduce((prev, current) => {
          return prev.base_currency_amount_total ?? 0 + current.base_currency_amount_total
        });
        const transactionTotal = result.data?.length;
        const destinationTotal = await convertRate(destination_currency, baseTotal)
        const finalResult = {
            base_currency_total: baseTotal,
            destination_currency_total: destinationTotal.data.amount,
            total_transactions: transactionTotal
        }
                        
        
      res.status(200).json(finalResult)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
        res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  }
  