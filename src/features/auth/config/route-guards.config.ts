import { ROLES } from '../constants/roles'
import type { RouteGuardConfig } from '../types/auth.types'

export const ROUTE_GUARD_CONFIG = {
  dashboard: {
    requireAuth: true,
    allowedRoles: [ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
    redirectTo: '/login',
    active: false,
  },
  profile: {
    requireAuth: true,
    allowedRoles: [ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
    redirectTo: '/login',
    active: false,
  },
} as const satisfies Record<string, RouteGuardConfig>
