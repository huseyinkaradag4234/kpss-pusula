import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  ClipboardList,
  Heart,
  LayoutDashboard,
  RotateCcw,
  User,
} from 'lucide-react'

export interface AppNavItem {
  id: string
  label: string
  shortLabel?: string
  to: string
  icon: LucideIcon
  end?: boolean
  showInBottomNav?: boolean
  placeholder?: boolean
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
    id: 'topics',
    label: 'Konular',
    to: '/dashboard',
    icon: BookOpen,
    showInBottomNav: true,
    placeholder: true,
  },
  {
    id: 'tests',
    label: 'Test Çöz',
    shortLabel: 'Test',
    to: '/dashboard',
    icon: ClipboardList,
    showInBottomNav: true,
    placeholder: true,
  },
  {
    id: 'mistakes',
    label: 'Yanlışlarım',
    to: '/dashboard',
    icon: RotateCcw,
    showInBottomNav: false,
    placeholder: true,
  },
  {
    id: 'favorites',
    label: 'Favorilerim',
    to: '/dashboard',
    icon: Heart,
    showInBottomNav: false,
    placeholder: true,
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
