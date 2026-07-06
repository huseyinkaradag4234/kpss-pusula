export interface BreadcrumbItem {
  label: string
  to?: string
}

export const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [{ label: 'Panel' }],
  '/profile': [
    { label: 'Panel', to: '/dashboard' },
    { label: 'Profil' },
  ],
}
