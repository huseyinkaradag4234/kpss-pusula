import type { Session, User } from '@supabase/supabase-js'
import { assertSupabaseConfigured } from '../../../config/env'
import { supabase } from '../../../lib/supabase'
import type { LoginCredentials, RegisterCredentials } from '../types/auth.types'

function ensureSupabaseConfigured(): void {
  assertSupabaseConfigured()
}

export async function login(
  credentials: LoginCredentials,
): Promise<{ user: User | null; session: Session | null }> {
  ensureSupabaseConfigured()
  const { data, error } = await supabase.auth.signInWithPassword(credentials)

  if (error) {
    throw error
  }

  return data
}

export async function logout(): Promise<void> {
  ensureSupabaseConfigured()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function register(
  credentials: RegisterCredentials,
): Promise<{ user: User | null; session: Session | null }> {
  ensureSupabaseConfigured()
  const { data, error } = await supabase.auth.signUp(credentials)

  if (error) {
    throw error
  }

  return data
}

export async function forgotPassword(email: string): Promise<void> {
  ensureSupabaseConfigured()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  })

  if (error) {
    throw error
  }
}

export async function getCurrentUser(): Promise<User | null> {
  ensureSupabaseConfigured()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  return user
}

export async function refreshSession(): Promise<Session | null> {
  ensureSupabaseConfigured()
  const { data, error } = await supabase.auth.refreshSession()

  if (error) {
    throw error
  }

  return data.session
}
