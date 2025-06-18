import { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import AdminSidebar from '../components/AdminSidebar'
import { getUserRole } from '@/utils/api'

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkRole = async () => {
      try {
        const { is_admin } = await getUserRole()

        if (!is_admin) {
          router.visit('/dashboard') // ✅ Redirect to user dashboard if not admin
        } else {
          setIsAdmin(true)
        }
      } catch (error) {
        console.error('Error checking role:', error)
        router.visit('/login') // Redirect to login if token fails
      } finally {
        setLoading(false)
      }
    }

    checkRole()
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking permissions...</p>
      </div>
    )
  }

  if (!isAdmin) return null // Prevent rendering if not admin

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
