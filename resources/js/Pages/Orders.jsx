import { useState } from 'react'
import AdminLayout from '../Layouts/AdminLayout'

const sampleOrders = [
  {
    id: 1,
    customerName: 'Samuel Ojeva',
    status: 'Pending',
    items: [
      {
        id: 15,
        name: 'Smart TV',
        price: 32000,
        image: 'https://images.unsplash.com/photo-1646861039459-fd9e3aabf3fb?q=80&w=1926&auto=format&fit=crop',
      },
      {
        id: 16,
        name: 'Headphones',
        price: 12000,
        image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 2,
    customerName: 'Jane Doe',
    status: 'Completed',
    items: [
      {
        id: 17,
        name: 'Air Conditioner',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1665826254141-bfa10685e002?q=80&w=2070&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 3,
    customerName: 'David Smith',
    status: 'Rejected',
    items: [
      {
        id: 18,
        name: 'Bluetooth Speaker',
        price: 8000,
        image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 4,
    customerName: 'Fatima Musa',
    status: 'Pending',
    items: [
      {
        id: 19,
        name: 'Laptop',
        price: 250000,
        image: 'https://images.unsplash.com/photo-1587613991042-3c7b76ddf0ba?q=80&w=2070&auto=format&fit=crop',
      },
      {
        id: 20,
        name: 'Wireless Mouse',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1589820296150-3a91e8af33e1?q=80&w=2070&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 5,
    customerName: 'Emeka Nwosu',
    status: 'Completed',
    items: [
      {
        id: 21,
        name: 'Microwave Oven',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1606813905296-c5b8f758bfc5?q=80&w=2070&auto=format&fit=crop',
      },
    ],
  },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('orders')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const updateStatus = (id, newStatus) => {
    alert(`${newStatus} ✅ (Demo only)`)
    setSelectedOrder(null)
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-[#130447] mb-6">All Orders</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#130447] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sampleOrders.map((order) => {
                const total = order.items.reduce((sum, item) => sum + item.price, 0)

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-[#130447]">#{order.id}</td>
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          order.status === 'Pending'
                            ? 'bg-yellow-500'
                            : order.status === 'Completed'
                            ? 'bg-green-600'
                            : 'bg-red-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">₦{total.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#130447] hover:underline font-semibold"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

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
                Order #{selectedOrder.id} – {selectedOrder.customerName}
              </h3>

              <div className="space-y-3 max-h-72 overflow-y-auto">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-2">
                    <img
                      src={item.image}
                      className="w-16 h-16 object-cover rounded"
                      alt={item.name}
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">₦{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedOrder.status === 'Pending' && (
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => updateStatus(selectedOrder.id, 'Rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => updateStatus(selectedOrder.id, 'Completed')}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Mark as Completed
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
