import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { fetchCurrentUser } from '@/utils/api' // Ensure this API function returns user
import { useCart } from '@/contexts/CartContext'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { cart } = useCart()

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchCurrentUser()
        setUser(userData)
      } catch (err) {
        console.error('Error fetching user:', err)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vat = Math.round(subtotal * 0.075)
  const total = subtotal + vat

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 space-y-4">
              {loading ? (
                <p>Loading user details...</p>
              ) : user ? (
                <>
                  <h3 className="text-lg font-semibold text-[#130447]">Welcome, {user.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p className="md:col-span-2"><strong>Billing Address:</strong> {user.billing_address}</p>
                  </div>
                </>
              ) : (
                <p>No user data available.</p>
              )}

              <hr className="my-4" />

              <h3 className="text-lg font-semibold text-[#130447]">Cart Summary</h3>

              {cart.length === 0 ? (
                <p className="text-sm text-gray-500">No products in cart.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={Array.isArray(item.images) ? item.images[0] : item.image || '/placeholder.png'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ₦{item.price.toLocaleString()} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="text-sm text-gray-700 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT (7.5%)</span>
                      <span>₦{vat.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
