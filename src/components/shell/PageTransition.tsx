import { Outlet, useLocation } from 'react-router-dom'

export default function PageTransition() {
  const location = useLocation()

  return (
    <div key={location.pathname} className="page-transition page-transition--app">
      <Outlet />
    </div>
  )
}
