
import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const BASE_CURRENCY = 'AUD'
const ALLOWED_CURRENCIES = ['USD', 'IDR'].join("%2C")


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        var myHeaders = new Headers();
        myHeaders.append("apikey", process.env.CURRENCY_API_KEY);
        // Default options are marked with *
        const url = process.env.CURRENCY_API_ENDPOINT + `?source=` + BASE_CURRENCY + '&currencies='+ALLOWED_CURRENCIES;
        const response = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: myHeaders,
            redirect: 'follow'
        })
        const result = await response.json();
        const finalResult =  Object.keys(result.quotes).map( currency => {
            let currentCurrency = currency.replace(BASE_CURRENCY, '');
            let key = BASE_CURRENCY+currentCurrency;
            return {
                status: 1,
                currency: currentCurrency,
                code: currentCurrency,
                value: result.quotes[key],
                updated_at: result.timestamp
            }
        });
        let insert = await supabase.from("currency_rates").upsert(finalResult);
       
        if(insert?.status == 201 || insert?.status == 200){
            res.status(200).json({ success: true, auth: 'authorized' });
        }
        
        res.status(200).json({ success: false, auth: 'authorized' });

      } else {
        res.status(401).json({ success: false, auth: 'failed' });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}