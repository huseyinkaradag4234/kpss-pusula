import { RouterProvider } from 'react-router-dom'
import { ToastProvider } from '../components/ui'
import ThemeProvider from '../contexts/ThemeProvider'
import { AuthProvider } from '../features/auth'
import { router } from '../router'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
