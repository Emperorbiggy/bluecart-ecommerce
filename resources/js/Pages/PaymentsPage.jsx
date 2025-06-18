import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminLayout from '../Layouts/AdminLayout'

export default function PaymentsPage() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('payments')

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const res = await axios.get('/api/payments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPayments(res.data.payments)
    } catch (error) {
      console.error('Failed to load payments:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-[#130447] mb-6">All Payments</h2>

        {loading ? (
          <p>Loading payments...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#130447] text-white text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">Paid By</th>
                  <th className="px-4 py-3 text-left">Order ID</th>
                  <th className="px-4 py-3 text-left">Reference</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {payments.map((payment) => {
                  const isCODPending =
                    payment.method === 'cod' && payment.status === 'pending'

                  const statusClass =
                    payment.status === 'completed' || isCODPending
                      ? 'bg-green-600'
                      : payment.status === 'pending'
                      ? 'bg-yellow-500'
                      : 'bg-red-600'

                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        {payment.user_name || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        #{payment.order_id || 'N/A'}
                      </td>
                      <td className="px-4 py-3 font-mono">
                        {payment.reference || '—'}
                      </td>
                      <td className="px-4 py-3">
                        ₦{Number(payment.amount || 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {payment.date
                          ? new Date(payment.date).toLocaleString()
                          : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusClass}`}
                        >
                          {payment.status?.toUpperCase() || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
