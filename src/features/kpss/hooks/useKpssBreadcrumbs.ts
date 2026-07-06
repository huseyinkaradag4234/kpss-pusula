import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import type { BreadcrumbItem } from '../../../types/breadcrumb'
import { KPSS_ROUTE_LABELS } from '../constants/routes'
import { getExamById, getSubjectById, getTopicById } from '../mock/data'

export function useKpssBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation()
  const params = useParams()
  const { pathname } = location

  return useMemo(() => {
    const panel: BreadcrumbItem = { label: 'Panel', to: '/dashboard' }

    if (pathname === '/dashboard') {
      return [{ label: 'Panel' }]
    }

    if (pathname === '/profile') {
      return [panel, { label: 'Profil' }]
    }

    if (pathname.startsWith('/subjects/') && params.id) {
      const subject = getSubjectById(params.id)
      return [
        panel,
        { label: 'Dersler', to: '/subjects' },
        { label: subject?.name ?? 'Ders' },
      ]
    }

    if (pathname.startsWith('/topics/') && params.id) {
      const topic = getTopicById(params.id)
      return [
        panel,
        { label: 'Dersler', to: '/subjects' },
        { label: topic?.name ?? 'Konu' },
      ]
    }

    if (pathname.startsWith('/exams/') && params.id) {
      const exam = getExamById(params.id)
      return [
        panel,
        { label: 'Denemeler', to: '/exams' },
        { label: exam?.title ?? 'Deneme' },
      ]
    }

    const staticLabel = KPSS_ROUTE_LABELS[pathname]
    if (staticLabel) {
      return [panel, { label: staticLabel }]
    }

    return [panel]
  }, [pathname, params.id])
}
