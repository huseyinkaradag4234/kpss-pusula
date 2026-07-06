import { createContext } from 'react'
import type { AuthState } from '../types/auth.types'

export type AuthContextValue = AuthState

export const AuthContext = createContext<AuthContextValue | null>(null)
