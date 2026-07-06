const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export function getSupabaseUrl(): string {
  return supabaseUrl ?? ''
}

export function getSupabaseAnonKey(): string {
  return supabaseAnonKey ?? ''
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

export function assertSupabaseConfigured(): void {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase yapılandırması eksik. VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY değerlerini .env.local dosyasına ekleyin.',
    )
  }
}
