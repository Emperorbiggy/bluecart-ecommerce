// AdminSidebar.jsx

import { Link, usePage, router } from '@inertiajs/react'
import {
  Menu,
  X,
  ShoppingCart,
  Box,
  PlusCircle,
  ClipboardList,
  User,
  CreditCard,
  LogOut,
} from 'lucide-react'
import { useState } from 'react'

const nav = [
  { key: 'dashboard', label: 'Dashboard', icon: ShoppingCart, href: '/admin/dashboard' },
  { key: 'all-products', label: 'All Products', icon: Box, href: '/admin/products' },
  { key: 'add-product', label: 'Add Product', icon: PlusCircle, href: '/admin/create/product' },
  { key: 'orders', label: 'Orders', icon: ClipboardList, href: '/admin/orders' },
  { key: 'payments', label: 'Payments', icon: CreditCard, href: '/admin/payments' },
  { key: 'profile', label: 'Profile', icon: User, href: '/admin/profile' },
]

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { url } = usePage()

  const handleLogout = () => {
    router.post('/logout')
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow z-30 flex items-center justify-between px-4 py-3">
        <button onClick={() => setIsOpen(true)} className="text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <ShoppingCart className="text-osunblue w-6 h-6" />
          <h1 className="text-lg font-bold text-osunblue">BlueCart</h1>
        </Link>
        <div className="w-6 h-6" />
      </div>

      {/* Sidebar */}
      <aside
  className={`w-64 bg-white z-40 shadow-md h-full fixed left-0 transform transition-transform duration-300 ease-in-out pt-[64px] md:pt-0 ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } md:translate-x-0 md:fixed md:top-0 md:left-0 md:h-screen flex flex-col`}
>

        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingCart className="text-osunblue w-6 h-6" />
            <h1 className="text-xl font-bold text-osunblue">BlueCart</h1>
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {nav.map(({ key, label, icon: Icon, href }) => (
            <Link
              key={key}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition-all ${
                url.startsWith(href)
                  ? 'bg-osunblue text-white'
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout Button at the Bottom */}
        <div className="border-t px-4 py-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg text-red-600 hover:bg-gray-100 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
