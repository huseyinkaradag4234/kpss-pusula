import { NavLink } from 'react-router-dom'
import Container from '../ui/Container/Container'

const footerLinks = {
  platform: [
    { to: '/', label: 'Ana Sayfa' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/profile', label: 'Profil' },
  ],
  account: [
    { to: '/login', label: 'Giriş' },
    { to: '/register', label: 'Kayıt Ol' },
  ],
  support: [
    { to: '/', label: 'Yardım Merkezi' },
    { to: '/', label: 'İletişim' },
  ],
} as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <p className="footer__logo">KPSS Pusula</p>
            <p className="footer__tagline">
              KPSS hazırlığınızda yol gösteren premium eğitim platformu.
            </p>
          </div>

          <div className="footer__links">
            <div>
              <p className="footer__column-title">Platform</p>
              {footerLinks.platform.map(({ to, label }) => (
                <NavLink key={label} to={to} className="footer__link interactive">
                  {label}
                </NavLink>
              ))}
            </div>
            <div>
              <p className="footer__column-title">Hesap</p>
              {footerLinks.account.map(({ to, label }) => (
                <NavLink key={label} to={to} className="footer__link interactive">
                  {label}
                </NavLink>
              ))}
            </div>
            <div>
              <p className="footer__column-title">Destek</p>
              {footerLinks.support.map(({ to, label }) => (
                <NavLink key={label} to={to} className="footer__link interactive">
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {year} KPSS Pusula. Tüm hakları saklıdır.</p>
          <p>Premium KPSS hazırlık deneyimi</p>
        </div>
      </Container>
    </footer>
  )
}
