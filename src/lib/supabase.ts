import { createClient } from '@supabase/supabase-js'
import { getSupabaseAnonKey, getSupabaseUrl } from '../config/env'
import type { Database } from '../types/database'

export const supabase = createClient<Database>(
  getSupabaseUrl(),
  getSupabaseAnonKey(),
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
)
