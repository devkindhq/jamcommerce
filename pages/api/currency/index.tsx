
import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_CURRENCY, DEALING_CURRENCIES } from '../../../config';
import supabase from '../../../utils/supabaseClient';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        const myHeaders = new Headers();
        if(!process.env.CURRENCY_API_KEY) throw new Error("Currency API key not found")
        myHeaders.append("apikey", process.env.CURRENCY_API_KEY);
        // Default options are marked with *
        const url = process.env.CURRENCY_API_ENDPOINT + `?base_currency=${BASE_CURRENCY}&currencies=${DEALING_CURRENCIES.join("%2C")}`
        const response = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: myHeaders,
            redirect: 'follow'
        })
        const result = await response.json();
        console.log(result);
        const finalResult =  Object.values(result.data).map( (currency: any) => {
            return {
                status: 1,
                currency: BASE_CURRENCY,
                code: currency.code,
                value: currency.value,
                //TODO: look at this time
                // updated_at: result.timestamp
            }
        });
        let insert = await supabase.from("currency_rates").upsert(finalResult);
        if(insert?.status == 201 || insert?.status == 200){
            return res.status(200).json({ success: true, auth: 'authorized' }); // all good
        }
        return res.status(200).json({ success: false, auth: 'authorized' }); // auth passed but code fail
      } else {
        return res.status(401).json({ success: false, auth: 'failed' }); // auth failed
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res.status(500).json({ statusCode: 500, message: err.message }); // something went wrong
    }
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
}