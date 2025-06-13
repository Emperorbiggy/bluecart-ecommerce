import { useState } from 'react'
import {
  User,
  ShoppingCart,
  CreditCard,
  PackageCheck,
  LogOut,
  Lock
} from 'lucide-react'

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [billingAddress, setBillingAddress] = useState('123 Blue Street, Ikeja, Lagos')
  const [editAddress, setEditAddress] = useState(false)
  const [newAddress, setNewAddress] = useState(billingAddress)

  const unpaidCartItems = [
    { id: 1, name: 'Bluetooth Headphones', price: 25000 },
    { id: 2, name: 'Smartwatch', price: 45000 }
  ]

  const orders = [
    { id: 1, name: 'Wireless Earbuds', price: 22000 },
    { id: 2, name: 'Bluetooth Speaker', price: 18000 }
  ]

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <User size={18} /> },
    { key: 'cart', label: 'Cart', icon: <ShoppingCart size={18} /> },
    { key: 'billing', label: 'Billing Address', icon: <CreditCard size={18} /> },
    { key: 'orders', label: 'Orders', icon: <PackageCheck size={18} /> },
    { key: 'logout', label: 'Logout', icon: <LogOut size={18} /> }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#130447]">Your Profile</h2>
            <div className="mb-8 space-y-2">
              <p><strong>Name:</strong> Ayodeji Samuel Ajayi</p>
              <p><strong>Email:</strong> Rifelinktechnology@gmail.com</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-[#130447]">Change Password</h3>
              <div className="space-y-4">
                <input type="password" placeholder="Old Password" className="w-full border px-4 py-2 rounded-md" />
                <input type="password" placeholder="New Password" className="w-full border px-4 py-2 rounded-md" />
                <input type="password" placeholder="Confirm New Password" className="w-full border px-4 py-2 rounded-md" />
                <button className="bg-[#130447] text-white px-4 py-2 rounded-md hover:bg-[#0f0334]">Update Password</button>
              </div>
            </div>
          </div>
        )

      case 'cart':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#130447]">Your Cart</h2>
            {unpaidCartItems.map(item => (
              <div key={item.id} className="border-b py-3 flex justify-between">
                <span>{item.name}</span>
                <span>₦{item.price.toLocaleString()}</span>
              </div>
            ))}
            <button className="mt-6 bg-[#130447] text-white px-4 py-2 rounded-md hover:bg-[#0f0334]">Proceed to Checkout</button>
          </div>
        )

      case 'billing':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#130447]">Billing Address</h2>
            {editAddress ? (
              <>
                <textarea
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full border rounded-md p-3"
                />
                <div className="mt-4 space-x-2">
                  <button
                    className="bg-[#130447] text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      setBillingAddress(newAddress)
                      setEditAddress(false)
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    onClick={() => setEditAddress(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4">{billingAddress}</p>
                <button
                  className="bg-[#130447] text-white px-4 py-2 rounded-md"
                  onClick={() => setEditAddress(true)}
                >
                  Update Address
                </button>
              </>
            )}
          </div>
        )

      case 'orders':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#130447]">Order History</h2>
            {orders.map(order => (
              <div key={order.id} className="border-b py-3 flex justify-between">
                <span>{order.name}</span>
                <span>₦{order.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )

      case 'logout':
        return <p className="text-red-600">You have been logged out.</p>

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-[#130447] text-white p-4 text-lg font-semibold">BlueCart User Dashboard</header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 border-r">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#130447] text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
              A
            </div>
            <nav className="space-y-2 w-full">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
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
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">{renderContent()}</main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-500 p-4">
        &copy; {new Date().getFullYear()} BlueCart. All rights reserved.
      </footer>
    </div>
  )
}
