import type { ReactNode } from 'react'
import type { RouteGuardConfig } from '../types/auth.types'
import ProtectedRoute from './ProtectedRoute'
import RoleGuard from './RoleGuard'

interface RouteGuardProps extends RouteGuardConfig {
  children: ReactNode
}

export default function RouteGuard({
  children,
  requireAuth = false,
  allowedRoles = [],
  redirectTo = '/login',
  active = false,
}: RouteGuardProps) {
  if (!active) {
    return <>{children}</>
  }

  if (requireAuth) {
    return (
      <ProtectedRoute redirectTo={redirectTo} active>
        {allowedRoles.length > 0 ? (
          <RoleGuard allowedRoles={allowedRoles} redirectTo={redirectTo} active>
            {children}
          </RoleGuard>
        ) : (
          children
        )}
      </ProtectedRoute>
    )
  }

  return <>{children}</>
}
