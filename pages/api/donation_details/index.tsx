import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../utils/supabaseClient';
import { convertRate } from '../currency/convert';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    try {
   
        const destination_currency = Array.isArray(req.query.destination_currency) ? req.query.destination_currency[0] : req.query.destination_currency
        if(!destination_currency) throw new Error("Destination currency not provided");
        const result = await supabase.from('checkout_sessions').select('*').eq('payment_status', 'paid');
        const baseTotal = result.data?.map(transaction => transaction.base_currency_amount_total ).reduce((prev, current) => {
          return prev + current
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
  