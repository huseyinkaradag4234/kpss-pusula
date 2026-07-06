import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import Container from '../components/ui/Container/Container'

export default function MainLayout() {
  const location = useLocation()

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-shell__main">
        <Container>
          <div key={location.pathname} className="page-transition">
            <Outlet />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
