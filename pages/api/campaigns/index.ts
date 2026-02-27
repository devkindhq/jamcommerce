import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase not configured')
  return createClient(url, key)
}

async function getUser(token: string) {
  const supabase = getSupabase()
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) throw new Error('Unauthorized')
  return user
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const user = await getUser(token)
    const supabase = getSupabase()

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return res.status(200).json(data ?? [])
    }

    if (req.method === 'POST') {
      const { title, description, goal_amount, currency, end_date } = req.body

      if (!title || !goal_amount || !currency) {
        return res.status(400).json({ error: 'title, goal_amount, and currency are required' })
      }

      const baseSlug = slugify(title)
      const suffix = Math.random().toString(36).substr(2, 6)
      const slug = `${baseSlug}-${suffix}`

      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          slug,
          title,
          description: description ?? '',
          goal_amount: Number(goal_amount),
          currency: currency.toUpperCase(),
          end_date: end_date ?? null,
          status: 'active',
        })
        .select()
        .single()

      if (error) throw error
      return res.status(201).json(data)
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    const status = message === 'Unauthorized' ? 401 : 500
    return res.status(status).json({ error: message })
  }
}
