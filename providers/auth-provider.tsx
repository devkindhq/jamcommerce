import { Session, User } from '@supabase/supabase-js'
import { ReactNode, useEffect, useState } from 'react'
import AuthContext from '../context/auth-context'
import supabaseAuth from '../utils/supabaseAuth'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabaseAuth) {
      setLoading(false)
      return
    }

    supabaseAuth.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabaseAuth.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!supabaseAuth) return { error: new Error('Auth not configured') }
    const { error } = await supabaseAuth.auth.signInWithPassword({ email, password })
    return { error: error as Error | null }
  }

  const signUp = async (email: string, password: string) => {
    if (!supabaseAuth) return { error: new Error('Auth not configured') }
    const { error } = await supabaseAuth.auth.signUp({ email, password })
    return { error: error as Error | null }
  }

  const signOut = async () => {
    if (!supabaseAuth) return
    await supabaseAuth.auth.signOut()
    setUser(null)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
