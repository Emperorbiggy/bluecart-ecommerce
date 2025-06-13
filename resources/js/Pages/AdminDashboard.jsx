import { useState } from 'react'
import {
  ShoppingCart,
  Box,
  PlusCircle,
  ClipboardList,
  CheckCircle,
  User,
  ShoppingBag,
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

// Register Chart.js modules
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
        backgroundColor: 'rgba(19, 4, 71, 0.2)',
        tension: 0.4,
      },
    ],
  }

  const renderMain = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card icon={ShoppingBag} label="Products" count={stats.products} />
              <Card icon={ClipboardList} label="Pending Orders" count={stats.pending} />
              <Card icon={CheckCircle} label="Complete Orders" count={stats.complete} />
            </div>

            <div className="bg-white rounded-lg shadow p-6 w-full max-w-4xl mx-auto">
              <h4 className="text-lg font-semibold mb-4">Sales Overview</h4>
              <div className="h-64">
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </>
        )
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700">
              {activeTab.split('-').join(' ').replace(/\b\w/g, l => l.toUpperCase())} content here...
            </p>
          </div>
        )
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
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-end items-center">
          <img
            src="https://via.placeholder.com/40"
            className="rounded-full w-10 h-10 mr-3"
            alt="Admin"
          />
          <span className="font-medium text-gray-700">Admin Name</span>
        </header>

        {/* Main */}
        <main className="p-6 lg:p-8 overflow-y-auto flex-1">{renderMain()}</main>
      </div>
    </div>
  )
}

// Card component
function Card({ icon: Icon, label, count }) {
  return (
    <div className="bg-osunblue text-white rounded-lg shadow p-5 flex items-center space-x-4">
      <div className="bg-white text-osunblue p-3 rounded-full shadow">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm">{label}</p>
        <h2 className="text-2xl font-bold">{count}</h2>
      </div>
    </div>
  )
}
