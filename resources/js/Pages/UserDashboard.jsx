import { useState } from 'react'

import AppLayout from '../Layouts/AppLayout'
import {
  User,
  ShoppingCart,
  CreditCard,
  PackageCheck,
  LogOut,
} from 'lucide-react'
import axios from 'axios'
import { router } from '@inertiajs/react'

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [name, setName] = useState('Ayodeji Samuel Ajayi')
  const [email, setEmail] = useState('Rifelinktechnology@gmail.com')
  const [billingAddress, setBillingAddress] = useState('123 Blue Street, Ikeja, Lagos')

  const unpaidCartItems = [
    { id: 1, name: 'Bluetooth Headphones', price: 25000, image: 'https://images.unsplash.com/photo-1580894747380-7bd6a27f479b?q=80&w=200&auto=format&fit=crop' },
    { id: 2, name: 'Smartwatch', price: 45000, image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=200&auto=format&fit=crop' }
  ]

  const orders = [
    { id: 1, name: 'Wireless Earbuds', price: 22000, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=200&auto=format&fit=crop' },
    { id: 2, name: 'Bluetooth Speaker', price: 18000, image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=200&auto=format&fit=crop' }
  ]

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <User size={18} /> },
    { key: 'cart', label: 'Cart', icon: <ShoppingCart size={18} /> },
    { key: 'billing', label: 'Billing Address', icon: <CreditCard size={18} /> },
    { key: 'orders', label: 'Orders', icon: <PackageCheck size={18} /> },
    { key: 'logout', label: 'Logout', icon: <LogOut size={18} /> },
  ]

  const handleLogout = () => {
  router.post(route('logout'));
};

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <button className="bg-[#130447] text-white px-4 py-2 rounded-md hover:bg-[#0f0334]">
                Update Profile
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold text-[#130447] mb-4">Change Password</h3>
              <div className="space-y-4">
                <input type="password" placeholder="Old Password" className="w-full border px-4 py-2 rounded-md" />
                <input type="password" placeholder="New Password" className="w-full border px-4 py-2 rounded-md" />
                <input type="password" placeholder="Confirm New Password" className="w-full border px-4 py-2 rounded-md" />
                <button className="bg-[#130447] text-white px-4 py-2 rounded-md hover:bg-[#0f0334]">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )

      case 'cart':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#130447]">Your Cart</h2>
            <div className="space-y-4">
              {unpaidCartItems.map(item => (
                <div key={item.id} className="flex items-center border rounded-md p-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">₦{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <button className="bg-[#130447] text-white px-6 py-2 rounded-md hover:bg-[#0f0334]">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )

      case 'billing':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#130447]">Billing Address</h2>
            <div>
              <textarea
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                className="w-full border rounded-md p-3"
                rows={3}
              />
            </div>
            <button className="bg-[#130447] text-white px-4 py-2 rounded-md hover:bg-[#0f0334]">
              Update Address
            </button>
          </div>
        )

      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#130447]">Order History</h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="flex items-center border rounded-md p-4">
                  <img src={order.image} alt={order.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold">{order.name}</p>
                  </div>
                  <p className="font-bold text-[#130447]">₦{order.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'logout':
        return <p className="text-gray-600">Logging out...</p>

      default:
        return null
    }
  }

  return (
    <AppLayout>
      <div className="py-10 px-4 flex justify-center">
        <div className="w-full max-w-5xl flex bg-white rounded-lg shadow-md overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-100 p-4 border-r">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-[#130447] text-white rounded-full flex items-center justify-center text-xl font-bold mb-2">
                {name.charAt(0)}
              </div>
              <p className="font-semibold text-center">{name}</p>
            </div>

            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (tab.key === 'logout') {
                      handleLogout()
                    } else {
                      setActiveTab(tab.key)
                    }
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
    </AppLayout>
  )
}
