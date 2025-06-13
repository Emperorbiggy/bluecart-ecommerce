import { useState } from 'react'
import AppLayout from '../Layouts/AppLayout'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ShoppingCart, Box, PlusCircle, ClipboardList, CheckCircle, User } from 'lucide-react'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const nav = [
    { key: 'dashboard', label: 'Dashboard', icon: ShoppingCart },
    { key: 'all-products', label: 'All Products', icon: Box },
    { key: 'add-product', label: 'Add Product', icon: PlusCircle },
    { key: 'pending-orders', label: 'Pending Orders', icon: ClipboardList },
    { key: 'complete-orders', label: 'Complete Orders', icon: CheckCircle },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  // Sample stats
  const stats = {
    products: 124,
    pending: 8,
    complete: 56,
  }

  // Sample chart data
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 8, 25],
        borderColor: '#130447',
        backgroundColor: 'rgba(19,4,71,0.3)',
        tension: 0.3,
      },
    ],
  }

  const renderMain = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500">Products</h3>
                <p className="text-2xl font-bold">{stats.products}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500">Pending Orders</h3>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500">Complete Orders</h3>
                <p className="text-2xl font-bold">{stats.complete}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
              <Line data={chartData} />
            </div>
          </div>
        )
      case 'all-products':
        return <p>🔍 All products list goes here...</p>
      case 'add-product':
        return <p>➕ Add Product form goes here...</p>
      case 'pending-orders':
        return <p>🕒 Pending orders management view...</p>
      case 'complete-orders':
        return <p>✅ Completed orders management view...</p>
      case 'profile':
        return <p>👤 Admin profile edit form...</p>
      default:
        return null
    }
  }

  return (
    <AppLayout>
      <div className="py-8 px-4 flex justify-center">
        <div className="w-full max-w-6xl flex bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-100 border-r">
            <div className="flex items-center gap-2 px-6 py-8">
              <ShoppingCart className="w-8 h-8 text-osunblue" />
              <span className="text-2xl font-bold text-osunblue">BlueCart</span>
            </div>
            <nav className="space-y-1 px-4">
              {nav.map(item => {
                const Icon = item.icon
                const active = activeTab === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-md text-left ${
                      active
                        ? 'bg-osunblue text-white'
                        : 'hover:bg-gray-200 text-gray-700'
                    } transition`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main Section */}
          <div className="flex-1 p-8">
            <div className="flex justify-end items-center mb-6">
              <img
                src="https://via.placeholder.com/40"
                alt="Admin"
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-medium">Admin Name</span>
            </div>

            {renderMain()}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
