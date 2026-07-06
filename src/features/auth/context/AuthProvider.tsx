import type { Session, User } from '@supabase/supabase-js'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { isSupabaseConfigured } from '../../../config/env'
import { supabase } from '../../../lib/supabase'
import type { UserRole } from '../constants/roles'
import { getUserRole } from '../utils/role.utils'
import { AuthContext, type AuthContextValue } from './AuthContext'

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [role, setRole] = useState<UserRole>(getUserRole(null))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function initializeAuth() {
      try {
        if (!isSupabaseConfigured()) {
          return
        }

        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession()

        if (!isMounted) {
          return
        }

        const initialUser = initialSession?.user ?? null
        setSession(initialSession)
        setUser(initialUser)
        setRole(getUserRole(initialUser))
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void initializeAuth()

    if (!isSupabaseConfigured()) {
      return
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) {
        return
      }

      const nextUser = nextSession?.user ?? null
      setSession(nextSession)
      setUser(nextUser)
      setRole(getUserRole(nextUser))
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      role,
      loading,
      isAuthenticated: Boolean(user),
    }),
    [user, session, role, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
