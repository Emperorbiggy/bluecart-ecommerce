import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  Menu,
  X,
  ShoppingCart,
  Box,
  PlusCircle,
  ClipboardList,
  CheckCircle,
  User,
} from 'lucide-react'

const nav = [
  { key: 'dashboard', label: 'Dashboard', icon: ShoppingCart, path: '/admin/dashboard' },
  { key: 'all-products', label: 'All Products', icon: Box, path: '/admin/products' },
  { key: 'add-product', label: 'Add Product', icon: PlusCircle, path: '/admin/products/add' },
  { key: 'pending-orders', label: 'Pending Orders', icon: ClipboardList, path: '/admin/orders/pending' },
  { key: 'complete-orders', label: 'Complete Orders', icon: CheckCircle, path: '/admin/orders/complete' },
  { key: 'profile', label: 'Profile', icon: User, path: '/admin/profile' },
]

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow z-30 flex items-center justify-between px-4 py-3">
        <button onClick={() => setIsOpen(true)} className="text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-osunblue w-6 h-6" />
          <h1 className="text-lg font-bold text-osunblue">BlueCart</h1>
        </div>
        <div className="w-6 h-6" />
      </div>

      {/* Sidebar */}
      <aside
        className={`
          w-64 bg-white z-40 shadow-md h-full
          fixed top-0 left-0
          md:fixed md:top-0 md:left-0 md:h-screen
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-osunblue w-6 h-6" />
            <h1 className="text-xl font-bold text-osunblue">BlueCart</h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {nav.map(({ key, label, icon: Icon, path }) => {
            const isActive = currentPath.startsWith(path)

            return (
              <Link
                key={key}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition-all ${
                  isActive ? 'bg-osunblue text-white' : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
