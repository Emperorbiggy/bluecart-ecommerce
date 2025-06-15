import React, { useState, useEffect } from 'react'
import { Link, router } from '@inertiajs/react'
import { User, ShoppingCart, CreditCard, PackageCheck, LogOut } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import AppLayout from '../Layouts/AppLayout'
import { fetchCurrentUser } from '@/utils/api'

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [currentUser, setCurrentUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const { cart, addToCart, removeFromCart } = useCart()

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <User size={18} /> },
    { key: 'cart', label: 'Cart', icon: <ShoppingCart size={18} /> },
    { key: 'billing', label: 'Billing Address', icon: <CreditCard size={18} /> },
    { key: 'orders', label: 'Orders', icon: <PackageCheck size={18} /> },
    { key: 'logout', label: 'Logout', icon: <LogOut size={18} /> },
  ]

  const handleLogout = () => router.post(route('logout'))

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { user } = await fetchCurrentUser()
        setCurrentUser(user)
      } catch {
        setCurrentUser(null)
      } finally {
        setLoadingUser(false)
      }
    }
    loadUser()
  }, [])

  if (loadingUser) {
    return <div className="py-20 text-center">Loading dashboard...</div>
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#130447]">Your Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={currentUser?.name || ''}
                  disabled
                  className="w-full border rounded-md p-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={currentUser?.email || ''}
                  disabled
                  className="w-full border rounded-md p-2 bg-gray-100"
                />
              </div>
            </div>
          </div>
        )

      case 'cart':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#130447]">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center border rounded-md p-4">
                    <img
                      src={Array.isArray(item.images) ? item.images[0] : item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500">
                        ₦{Number(item.price).toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Link
                    href="/checkout"
                    className="bg-[#130447] text-white px-6 py-2 rounded-md hover:bg-[#0f0334]"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        )

      case 'billing':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#130447]">Billing Address</h2>
            <textarea
              value={currentUser?.billing_address || ''}
              disabled
              className="w-full border rounded-md p-3 bg-gray-100"
              rows={3}
            />
          </div>
        )

      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#130447]">Order History</h2>
            <p className="text-gray-500">You have no past orders yet.</p>
          </div>
        )

      case 'logout':
        handleLogout()
        return <p className="text-gray-600">Logging out...</p>

      default:
        return null
    }
  }

  return (
    <div className="py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl flex bg-white rounded-lg shadow-md overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 border-r">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-[#130447] text-white rounded-full flex items-center justify-center text-xl font-bold mb-2">
              {currentUser?.name?.charAt(0)}
            </div>
            <p className="font-semibold text-center">{currentUser?.name}</p>
          </div>

          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  if (tab.key === 'logout') handleLogout()
                  else setActiveTab(tab.key)
                }}
                className={`flex items-center gap-2 px-4 py-2 w-full text-sm font-medium rounded-md transition ${
                  activeTab === tab.key
                    ? 'bg-[#130447] text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}

// ✅ Wrap with AppLayout using Inertia's page layout feature
UserDashboard.layout = (page) => <AppLayout>{page}</AppLayout>
