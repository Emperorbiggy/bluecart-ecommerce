import { useEffect, useState } from 'react'
import axios from 'axios'
import AdminLayout from '../Layouts/AdminLayout'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [activeTab, setActiveTab] = useState('orders')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const res = await axios.get('/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrders(res.data.orders)
    } catch (error) {
      console.error('Failed to load orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('auth_token')
      const res = await axios.patch(
        `/api/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      const updatedOrder = res.data.order
      setOrders((prev) =>
        prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
      )
      setSelectedOrder(null)
    } catch (error) {
      console.error('Failed to update order:', error)
      alert('Failed to update order status')
    }
  }

  const renderActionButtons = (order) => {
    const isCOD = order.payment_method === 'cod'
    const status = order.status.toLowerCase()
    const paymentStatus = order.payment_status.toLowerCase()

    if (isCOD) {
      if (status === 'pending') {
        return (
          <>
            <button onClick={() => updateOrderStatus(order.id, 'rejected')} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Reject</button>
            <button onClick={() => updateOrderStatus(order.id, 'processing')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Accept</button>
          </>
        )
      } else if (status === 'processing') {
        return (
          <>
            <button onClick={() => updateOrderStatus(order.id, 'rejected')} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Reject</button>
            <button onClick={() => updateOrderStatus(order.id, 'completed')} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Complete</button>
          </>
        )
      }
    } else {
      if (status === 'processing') {
        return (
          <>
            <button onClick={() => updateOrderStatus(order.id, 'refunded')} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Refund</button>
            <button onClick={() => updateOrderStatus(order.id, 'completed')} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Complete</button>
          </>
        )
      }
    }

    return null
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-[#130447] mb-6">All Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#130447] text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-[#130447]">#{order.order_id}</td>
                    <td className="px-4 py-3">{order.user?.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        order.status === 'completed'
                          ? 'bg-green-600'
                          : order.status === 'processing'
                          ? 'bg-blue-600'
                          : order.status === 'pending'
                          ? 'bg-yellow-500'
                          : order.status === 'rejected'
                          ? 'bg-red-600'
                          : order.status === 'refunded'
                          ? 'bg-gray-600'
                          : 'bg-gray-400'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="block">
                        <b>Method:</b> {order.payment_method.toUpperCase()}
                      </span>
                      <span>
                        <b>Status:</b> {order.payment_status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">₦{Number(order.total_price).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#130447] hover:underline font-semibold"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-xl">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
              >
                &times;
              </button>

              <h3 className="text-2xl font-bold mb-4 text-[#130447]">
                Order #{selectedOrder.order_id} – {selectedOrder.user?.name}
              </h3>

              <div className="mb-4 text-sm text-gray-600 space-y-1">
                <p><b>Payment Method:</b> {selectedOrder.payment_method.toUpperCase()}</p>
                <p><b>Payment Status:</b> {selectedOrder.payment_status.toUpperCase()}</p>
                <p><b>Order Status:</b> {selectedOrder.status.toUpperCase()}</p>
                <p><b>VAT:</b> ₦{Number(selectedOrder.vat).toLocaleString()}</p>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto border-t pt-4">
                {selectedOrder.items.map((item) => {
                  const images = typeof item.product?.images === 'string'
                    ? JSON.parse(item.product.images)
                    : item.product?.images || []
                  const firstImage = images[0]

                  return (
                    <div key={item.id} className="flex items-center space-x-4 border-b pb-2">
                      <img
                        src={firstImage || '/placeholder.png'}
                        className="w-16 h-16 object-cover rounded"
                        alt={item.product?.name || 'Product'}
                      />
                      <div>
                        <p className="font-medium">{item.product?.name}</p>
                        <p className="text-sm text-gray-600">
                          ₦{Number(item.unit_price).toLocaleString()} × {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-[#130447]">
                          Total: ₦{Number(item.total_price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Dynamic Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                {renderActionButtons(selectedOrder)}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
