import { LogOut, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Dropdown } from '../ui'

export default function UserProfileMenu() {
  const navigate = useNavigate()

  return (
    <Dropdown
      align="right"
      trigger={
        <button
          type="button"
          className="user-menu__trigger interactive"
          aria-label="Kullanıcı menüsü"
        >
          <Avatar name="KPSS Öğrencisi" size="sm" />
          <span className="user-menu__name">Öğrenci</span>
        </button>
      }
      items={[
        {
          id: 'profile',
          label: 'Profilim',
          icon: <User size={16} aria-hidden="true" />,
          onSelect: () => navigate('/profile'),
        },
        {
          id: 'settings',
          label: 'Ayarlar',
          icon: <Settings size={16} aria-hidden="true" />,
          onSelect: () => navigate('/profile'),
        },
        {
          id: 'logout',
          label: 'Çıkış Yap',
          icon: <LogOut size={16} aria-hidden="true" />,
          danger: true,
          onSelect: () => navigate('/login'),
        },
      ]}
    />
  )
}
