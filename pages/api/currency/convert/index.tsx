
import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_CURRENCY } from '../../../../config';
import supabase from '../../../../utils/supabaseClient';


// TODO: Move htis somewhere useful
// NOTE: The amount here must be in 10s. e.g. 500 = 5 dollar. We want 500. This is how Stripe does it.
export const convertRate = async (code: string, amount: number) => {
  const currency_rate = await supabase.from("currency_rates").select('*').eq('code', code.toUpperCase()).order('updated_at', {ascending: false}).limit(1).single();
  return {
    ...currency_rate,
    ...({data: Object.assign({},currency_rate.data, 
      (amount && {amount:(currency_rate.data.value * (amount))})
      )}),
  }
}

// TODO: Move htis somewhere useful
export const convertRateToBase = async (code: string, amount: number) => {
  const currency_rate = await supabase.from("currency_rates").select('*').eq('code', code.toUpperCase()).order('updated_at', {ascending: false}).limit(1).single(),
  currency_calculation = amount/currency_rate.data.value ;
  return {
    ...currency_rate,
    ...({data: Object.assign({},currency_rate.data, 
      (amount > 0 && {amount: currency_calculation})
      )}),
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers; // TODO: implement CORS here? 

        const code = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code ?? BASE_CURRENCY
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const amount: number | undefined = Array.isArray(req.query.amount) ? parseInt(req.query.amount[0]) : parseInt(req.query.amount ?? 0)
        const result = await convertRate(code, amount);
        return res.status(200).json(result);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}