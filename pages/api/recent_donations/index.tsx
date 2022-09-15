import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const filter = (checkout_sesions) => {
    return {
        ...checkout_sesions,
        data: checkout_sesions.data.map(function(checkout_session: any){
            if(checkout_session.anonymous == "true"){
                checkout_session.name = 'Anonymous'
            }
            return checkout_session;
        })
    }
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    try {
        const checkout_sessions =
        await supabase.from('checkout_sessions').select('customer_details->name, line_items, created_at, metadata->anonymous').order('created_at', {ascending: true}).limit(3)


      res.status(200).json(filter(checkout_sessions))
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  }
  