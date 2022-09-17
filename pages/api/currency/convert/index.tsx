
import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;
        const { code, amount  } = req.query;
        let currency_rate = await supabase.from("currency_rates").select('*').eq('code', code).order('updated_at', {ascending: false}).limit(1).single();
        const finalResult = {
          ...currency_rate,
          ...({data: Object.assign({},currency_rate.data, 
            (amount && {amount:(currency_rate.data.value * amount)})
            )}),
        }
        return res.status(200).json(finalResult);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}