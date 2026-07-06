import type { Session, User } from '@supabase/supabase-js'
import { assertSupabaseConfigured } from '../../../config/env'
import { getSupabaseClient } from '../../../lib/supabase'
import type { LoginCredentials, RegisterCredentials } from '../types/auth.types'

function getClient() {
  assertSupabaseConfigured()
  const client = getSupabaseClient()

  if (!client) {
    throw new Error('Supabase client is not configured.')
  }

  return client
}

export async function login(
  credentials: LoginCredentials,
): Promise<{ user: User | null; session: Session | null }> {
  const { data, error } = await getClient().auth.signInWithPassword(credentials)

  if (error) {
    throw error
  }

  return data
}

export async function logout(): Promise<void> {
  const { error } = await getClient().auth.signOut()

  if (error) {
    throw error
  }
}

export async function register(
  credentials: RegisterCredentials,
): Promise<{ user: User | null; session: Session | null }> {
  const { data, error } = await getClient().auth.signUp(credentials)

  if (error) {
    throw error
  }

  return data
}

export async function forgotPassword(email: string): Promise<void> {
  const { error } = await getClient().auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  })

  if (error) {
    throw error
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
    error,
  } = await getClient().auth.getUser()

  if (error) {
    throw error
  }

  return user
}

export async function refreshSession(): Promise<Session | null> {
  const { data, error } = await getClient().auth.refreshSession()

  if (error) {
    throw error
  }

  return data.session
}
