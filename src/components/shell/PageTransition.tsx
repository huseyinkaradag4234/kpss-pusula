import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Loading from '../ui/Loading/Loading'

export default function PageTransition() {
  const location = useLocation()

  return (
    <Suspense fallback={<Loading fullscreen label="Sayfa yükleniyor..." />}>
      <div key={location.pathname} className="page-transition page-transition--app">
        <Outlet />
      </div>
    </Suspense>
  )
}
