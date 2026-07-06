import type { User } from '@supabase/supabase-js'
import { ROLE_HIERARCHY, ROLES, type UserRole } from '../constants/roles'

const VALID_ROLES = new Set<UserRole>(Object.values(ROLES))

function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && VALID_ROLES.has(value as UserRole)
}

export function getUserRole(user: User | null): UserRole {
  if (!user) {
    return ROLES.USER
  }

  const role = user.app_metadata?.role

  if (isUserRole(role)) {
    return role
  }

  return ROLES.USER
}

export function hasMinimumRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

export function hasAnyRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.some((role) => hasMinimumRole(userRole, role))
}
