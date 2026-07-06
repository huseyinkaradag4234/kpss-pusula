import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthLoadingState from '../components/AuthLoadingState'
import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
  active?: boolean
}

export default function ProtectedRoute({
  children,
  redirectTo = '/login',
  active = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (!active) {
    return <>{children}</>
  }

  if (loading) {
    return <AuthLoadingState />
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return <>{children}</>
}
