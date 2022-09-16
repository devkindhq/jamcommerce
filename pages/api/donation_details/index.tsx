import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)


// Accepts the array and key
const groupBy = (array: [], key: string) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    try {
        console.log(req.query);
        const result = await supabase.from('checkout_sessions').select('*').eq('payment_status', 'paid');
        const groupedCurrency = groupBy(result.data, 'currency');
        const allCurrencies = Object.keys(groupedCurrency);
        const currencyTotals = allCurrencies.map( currency => {
            let currentCurrencies = groupedCurrency[currency];
            let amounts = currentCurrencies.map(e => (e.amount_total));
            let total = amounts.reduce((prev, current) => prev+current, 0);
            return {
                currency: currency,
                total: total,
                total_transactions: currentCurrencies.length
            }
        });
        const finalResult = {
            details: currencyTotals,
            base_currency_total: 1000
        }
                        
        
      res.status(200).json(finalResult)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
        res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  }
  