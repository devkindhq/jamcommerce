import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required.' })
  }

  const sanitized = email.trim().toLowerCase()

  // Try Supabase first (if configured), fall back to a local JSONL file
  try {
    const Supabase = (await import('../../../utils/supabaseClient')).default
    const { error } = await Supabase
      .from('waitlist')
      .insert({ email: sanitized, created_at: new Date().toISOString() })

    if (error) throw error
    return res.status(200).json({ success: true })
  } catch {
    // Supabase not configured or unavailable — persist locally
    try {
      const filePath = path.join(process.cwd(), 'waitlist.jsonl')
      const entry = JSON.stringify({ email: sanitized, created_at: new Date().toISOString() }) + '\n'
      fs.appendFileSync(filePath, entry, 'utf8')
      return res.status(200).json({ success: true })
    } catch (fileErr) {
      console.error('[waitlist] Could not save entry:', fileErr)
      return res.status(500).json({ error: 'Could not save your email. Please try again.' })
    }
  }
}
