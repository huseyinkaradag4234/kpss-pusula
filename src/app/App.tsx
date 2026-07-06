import { RouterProvider } from 'react-router-dom'
import SupabaseConfigNotice from '../components/common/SupabaseConfigNotice'
import { ToastProvider } from '../components/ui'
import ThemeProvider from '../contexts/ThemeProvider'
import { AuthProvider } from '../features/auth'
import { router } from '../router'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <SupabaseConfigNotice />
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
