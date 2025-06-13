import { useState } from 'react'
import {
  ShoppingCart,
  Box,
  PlusCircle,
  ClipboardList,
  CheckCircle,
  User,
} from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 25000,
    status: 'Active',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Smartwatch',
    price: 18000,
    status: 'Out of Stock',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 15000,
    status: 'Active',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'USB-C Cable',
    price: 3500,
    status: 'Active',
    image: 'https://via.placeholder.com/150',
  },
]

const nav = [
  { key: 'dashboard', label: 'Dashboard', icon: ShoppingCart },
  { key: 'all-products', label: 'All Products', icon: Box },
  { key: 'add-product', label: 'Add Product', icon: PlusCircle },
  { key: 'pending-orders', label: 'Pending Orders', icon: ClipboardList },
  { key: 'complete-orders', label: 'Complete Orders', icon: CheckCircle },
  { key: 'profile', label: 'Profile', icon: User },
]

export default function AllProducts() {
  const [activeTab, setActiveTab] = useState('all-products')

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r flex flex-col">
        <div className="flex items-center px-6 py-6 gap-2">
          <ShoppingCart className="text-osunblue w-6 h-6" />
          <h1 className="text-xl font-bold text-osunblue">BlueCart</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {nav.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left ${
                activeTab === key
                  ? 'bg-osunblue text-white'
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} BlueCart
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-end items-center">
          <img
            src="https://via.placeholder.com/40"
            className="rounded-full w-10 h-10 mr-3"
            alt="Admin"
          />
          <span className="font-medium text-gray-700">Admin Name</span>
        </header>

        {/* All Products Content */}
        <main className="p-6 lg:p-8 overflow-y-auto flex-1">
          <h2 className="text-2xl font-semibold text-osunblue mb-6">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-1">₦{product.price.toLocaleString()}</p>
                  <span
                    className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${
                      product.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
