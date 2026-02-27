import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Returns null if Supabase env vars are not configured.
// Components should check for null before calling auth methods.
const supabaseAuth: SupabaseClient | null = url && key ? createClient(url, key) : null

export default supabaseAuth
