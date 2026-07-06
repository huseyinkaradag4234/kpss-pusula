import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import type { UserRole } from '../constants/roles'
import AuthLoadingState from '../components/AuthLoadingState'
import { useAuth } from '../hooks/useAuth'
import { hasAnyRole } from '../utils/role.utils'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
  active?: boolean
}

export default function RoleGuard({
  children,
  allowedRoles,
  redirectTo = '/',
  active = false,
}: RoleGuardProps) {
  const { role, loading, isAuthenticated } = useAuth()

  if (!active) {
    return <>{children}</>
  }

  if (loading) {
    return <AuthLoadingState />
  }

  if (!isAuthenticated || !hasAnyRole(role, allowedRoles)) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
