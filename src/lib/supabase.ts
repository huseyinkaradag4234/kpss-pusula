import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from '../config/env'
import type { Database } from '../types/database'

let supabaseClient: SupabaseClient<Database> | null = null

export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured()) {
    return null
  }

  if (!supabaseClient) {
    supabaseClient = createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  }

  return supabaseClient
}
