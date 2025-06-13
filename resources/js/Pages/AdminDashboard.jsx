import { useState } from 'react'
import {
  ShoppingCart,
  Box,
  PlusCircle,
  ClipboardList,
  CheckCircle,
  User,
} from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Chart.js registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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

  const stats = {
    products: 124,
    pending: 8,
    complete: 56,
  }

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 8, 25],
        borderColor: '#130447',
        backgroundColor: 'rgba(19, 4, 71, 0.3)',
        tension: 0.4,
      },
    ],
  }

  const renderMain = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500 text-sm">Products</h3>
                <p className="text-2xl font-bold">{stats.products}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500 text-sm">Pending Orders</h3>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500 text-sm">Complete Orders</h3>
                <p className="text-2xl font-bold">{stats.complete}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold mb-4">Sales Overview</h4>
              <Line data={chartData} />
            </div>
          </>
        )
      case 'all-products':
        return <p className="text-gray-700">📦 All products will display here...</p>
      case 'add-product':
        return <p className="text-gray-700">➕ Add Product form here...</p>
      case 'pending-orders':
        return <p className="text-gray-700">⏳ Pending orders go here...</p>
      case 'complete-orders':
        return <p className="text-gray-700">✅ Completed orders go here...</p>
      case 'profile':
        return <p className="text-gray-700">👤 Admin profile management...</p>
      default:
        return null
    }
  }

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
        {/* Top Bar */}
        <header className="bg-white shadow px-6 py-4 flex justify-end items-center">
          <img
            src="https://via.placeholder.com/40"
            className="rounded-full w-10 h-10 mr-3"
            alt="Admin"
          />
          <span className="font-medium text-gray-700">Admin Name</span>
        </header>

        {/* Content */}
        <main className="p-8 overflow-y-auto flex-1">{renderMain()}</main>
      </div>
    </div>
  )
}
