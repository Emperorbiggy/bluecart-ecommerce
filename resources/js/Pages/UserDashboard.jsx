import React, { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'
import {
  User,
  ShoppingCart,
  CreditCard,
  PackageCheck,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import AppLayout from '../Layouts/AppLayout'
import { fetchCurrentUser, getMyOrders } from '@/utils/api'
import axios from 'axios'
import BlueCartLoader from '@/components/BlueCartLoader'

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  const { cart } = useCart()

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <User size={18} /> },
    { key: 'cart', label: 'Cart', icon: <ShoppingCart size={18} /> },
    { key: 'billing', label: 'Billing Address', icon: <CreditCard size={18} /> },
    { key: 'orders', label: 'Orders', icon: <PackageCheck size={18} /> },
    { key: 'logout', label: 'Logout', icon: <LogOut size={18} /> },
  ]

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      await axios.post('/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  useEffect(() => {
    const loadUserAndOrders = async () => {
      try {
        const { user } = await fetchCurrentUser()
        setCurrentUser(user)
        const orders = await getMyOrders()
        setOrders(orders)
      } catch {
        setCurrentUser(null)
      } finally {
        setLoadingUser(false)
        setLoadingOrders(false)
      }
    }
    loadUserAndOrders()
  }, [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : 'auto'
  }, [sidebarOpen])

  if (loadingUser) return <BlueCartLoader />

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#130447]">Your Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Full Name</label>
                <input type="text" value={currentUser?.name || ''} disabled className="w-full border rounded-md p-2 bg-gray-100" />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Email Address</label>
                <input type="email" value={currentUser?.email || ''} disabled className="w-full border rounded-md p-2 bg-gray-100" />
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
                    <img src={Array.isArray(item.images) ? item.images[0] : item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4 flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500">₦{Number(item.price).toLocaleString()} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Link href="/checkout" className="bg-[#130447] text-white px-6 py-2 rounded-md hover:bg-[#0f0334]">Proceed to Checkout</Link>
                </div>
              </div>
            )}
          </div>
        )
      case 'billing':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#130447]">Billing Address</h2>
            <textarea value={currentUser?.billing_address || ''} disabled className="w-full border rounded-md p-3 bg-gray-100" rows={3} />
          </div>
        )
      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#130447]">Order History</h2>
            {loadingOrders ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500">You have no past orders yet.</p>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="border rounded-lg shadow-sm p-6 bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#130447] mb-1">Order #{order.order_id}</h3>
                        <p className="text-sm text-gray-600">Total: ₦{Number(order.total_price).toLocaleString()} | VAT: ₦{Number(order.vat).toLocaleString()}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className={`px-2 py-1 rounded-full ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.payment_status.toUpperCase()}</span>
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">{order.payment_method.toUpperCase()}</span>
                        <span className={`px-2 py-1 rounded-full ${order.status === 'completed' ? 'bg-green-200 text-green-900' : order.status === 'processing' ? 'bg-yellow-200 text-yellow-900' : 'bg-red-100 text-red-800'}`}>{order.status?.toUpperCase() || 'PENDING'}</span>
                      </div>
                    </div>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead>
                          <tr className="text-gray-700 border-b">
                            <th className="py-2 pr-4">Product</th>
                            <th className="py-2 pr-4">Qty</th>
                            <th className="py-2 pr-4">Price</th>
                            <th className="py-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map(item => (
                            <tr key={item.id} className="border-b text-gray-600">
                              <td className="py-2 pr-4">{item.product?.name || 'Product'}</td>
                              <td className="py-2 pr-4">{item.quantity}</td>
                              <td className="py-2 pr-4">₦{Number(item.unit_price).toLocaleString()}</td>
                              <td className="py-2">₦{Number(item.total_price).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
    <div className="relative bg-gray-50 min-h-screen">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#130447]">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-lg font-bold text-[#130447]">User Dashboard</h2>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md min-h-screen">
        {/* Sidebar */}
        <aside className={`
          bg-gray-100 border-r w-64 fixed md:static top-0 left-0 h-full z-40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block
        `}>
          <div className="p-4 pt-32 md:pt-4">
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
                    setSidebarOpen(false)
                  }}
                  className={`flex items-center gap-2 px-4 py-2 w-full text-sm font-medium rounded-md transition ${
                    activeTab === tab.key ? 'bg-[#130447] text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

UserDashboard.layout = (page) => <AppLayout>{page}</AppLayout>
