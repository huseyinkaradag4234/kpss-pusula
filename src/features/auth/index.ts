export { default as AuthProvider } from './context/AuthProvider'
export { AuthContext, type AuthContextValue } from './context/AuthContext'
export { useAuth } from './hooks/useAuth'
export { ROLES, type UserRole } from './constants/roles'
export { ROUTE_GUARD_CONFIG } from './config/route-guards.config'
export * as authService from './services/auth.service'
export { ProtectedRoute, RoleGuard, RouteGuard } from './guards'
export { getUserRole, hasAnyRole, hasMinimumRole } from './utils/role.utils'
export type {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  RouteGuardConfig,
} from './types/auth.types'
