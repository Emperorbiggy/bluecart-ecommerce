import { useState } from 'react'
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

// Sample product data (same as before, trimmed for brevity)
const products = {
  branded: [
    {
      id: 1,
      name: 'Laptops',
      price: 9500,
      image:
        'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Running Shoes',
      price: 15000,
      image:
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop',
    },
  ],
  // Add other categories here...
}

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex bg-gray-100 overflow-hidden min-h-screen relative">
      {/* Sidebar - Responsive */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-md transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:shadow-none`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-osunblue w-6 h-6" />
            <h1 className="text-xl font-bold text-osunblue">BlueCart</h1>
          </div>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {nav.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key)
                setIsSidebarOpen(false)
              }}
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
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <header className="bg-white shadow px-4 py-4 flex justify-between items-center sticky top-0 z-10">
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/40"
              className="rounded-full w-10 h-10"
              alt="Admin"
            />
            <span className="font-medium text-gray-700 hidden sm:block">
              Admin Name
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-osunblue mb-6">
            All Products
          </h2>

          {Object.entries(products).map(([category, items]) => (
            <div key={category} className="mb-10">
              <h3 className="text-lg font-bold capitalize text-gray-700 mb-4">
                {category.replace('_', ' ')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((product) => (
                  <div
                    key={`${category}-${product.id}-${product.name}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        ₦{product.price.toLocaleString()}
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}
