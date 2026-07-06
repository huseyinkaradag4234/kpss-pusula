export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const

export type UserRole = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [ROLES.USER]: 1,
  [ROLES.ADMIN]: 2,
  [ROLES.SUPER_ADMIN]: 3,
}
