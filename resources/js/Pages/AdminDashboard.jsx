import AdminLayout from '../Layouts/AdminLayout'
import {
  ShoppingBag,
  ClipboardList,
  CheckCircle,
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

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold text-osunblue mb-6">Dashboard Overview</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card icon={ShoppingBag} label="Products" count={stats.products} />
          <Card icon={ClipboardList} label="Pending Orders" count={stats.pending} />
          <Card icon={CheckCircle} label="Complete Orders" count={stats.complete} />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-4xl mx-auto">
          <h4 className="text-lg font-semibold mb-4">Sales Overview</h4>
          <div className="h-64">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </AdminLayout>
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
