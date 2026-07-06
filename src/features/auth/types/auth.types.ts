import type { Session, User } from '@supabase/supabase-js'
import type { UserRole } from '../constants/roles'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  session: Session | null
  role: UserRole
  loading: boolean
  isAuthenticated: boolean
}

export interface RouteGuardConfig {
  requireAuth?: boolean
  allowedRoles?: UserRole[]
  redirectTo?: string
  active?: boolean
}
