import {
  BookOpen,
  ClipboardList,
  Heart,
  LayoutDashboard,
  RotateCcw,
  User,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { KPSS_ROUTES } from '../features/kpss/constants/routes'

export interface AppNavItem {
  id: string
  label: string
  shortLabel?: string
  to: string
  icon: LucideIcon
  end?: boolean
  showInBottomNav?: boolean
}

export const appNavItems: AppNavItem[] = [
  {
    id: 'dashboard',
    label: 'Panel',
    to: '/dashboard',
    icon: LayoutDashboard,
    end: true,
    showInBottomNav: true,
  },
  {
    id: 'subjects',
    label: 'Konular',
    to: KPSS_ROUTES.subjects,
    icon: BookOpen,
    showInBottomNav: true,
  },
  {
    id: 'exams',
    label: 'Test Çöz',
    shortLabel: 'Test',
    to: KPSS_ROUTES.exams,
    icon: ClipboardList,
    showInBottomNav: true,
  },
  {
    id: 'mistakes',
    label: 'Yanlışlarım',
    to: KPSS_ROUTES.questionBank,
    icon: RotateCcw,
    showInBottomNav: false,
  },
  {
    id: 'favorites',
    label: 'Favorilerim',
    to: KPSS_ROUTES.favorites,
    icon: Heart,
    showInBottomNav: false,
  },
  {
    id: 'profile',
    label: 'Profil',
    shortLabel: 'Profil',
    to: '/profile',
    icon: User,
    end: true,
    showInBottomNav: true,
  },
]

export const bottomNavItems = appNavItems.filter((item) => item.showInBottomNav)
