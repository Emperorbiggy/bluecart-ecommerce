import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminLayout from '../Layouts/AdminLayout'
import { fetchCurrentUser, getAllProducts } from '@/utils/api'
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
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // User
        const userData = await fetchCurrentUser()
        setUser(userData)

        // Products
        const productData = await getAllProducts()
        const parsed = productData.map(product => ({
          ...product,
          images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
        }))
        setProducts(parsed)

        // Orders
        const token = localStorage.getItem('auth_token')
        const orderRes = await axios.get('/api/admin/orders', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setOrders(orderRes.data.orders)

        // Payments
        const paymentRes = await axios.get('/api/payments', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setPayments(paymentRes.data.payments)
      } catch (error) {
        console.error('Dashboard data fetch failed', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Stats
  const totalProducts = products.length
  const pendingOrders = orders.filter(o =>
    ['Pending', 'Processing'].includes(o.status)
  ).length
  const completeOrders = orders.filter(o => o.status === 'completed').length

  // Prepare weekly sales chart data from payments
  const salesByWeek = Array(5).fill(0) // 4 weeks + buffer

  payments.forEach(payment => {
    const date = new Date(payment.date || payment.created_at)
    const week = Math.ceil(date.getDate() / 7)
    salesByWeek[week - 1] += Number(payment.amount || 0)
  })

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Sales (₦)',
        data: salesByWeek.slice(0, 4),
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
          <Card icon={ShoppingBag} label="Products" count={totalProducts} />
          <Card icon={ClipboardList} label="Pending Orders" count={pendingOrders} />
          <Card icon={CheckCircle} label="Complete Orders" count={completeOrders} />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-4xl mx-auto">
          <h4 className="text-lg font-semibold mb-4">Sales Overview (This Month)</h4>
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
