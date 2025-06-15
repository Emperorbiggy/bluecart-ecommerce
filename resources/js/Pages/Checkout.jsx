import React, { useState, useEffect } from 'react'
import { FaGoogle, FaFacebookF } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'
import AppLayout from '../Layouts/AppLayout'
import { fetchCurrentUser, createOrder } from '@/utils/api'

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('paystack')
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { cart, clearCart } = useCart()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [orderId, setOrderId] = useState(null)


  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vat = Math.round(subtotal * 0.075)
  const total = subtotal + vat

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchCurrentUser()
        setCurrentUser(res.user)
      } catch (error) {
        console.warn('No user logged in')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

 const handleCheckout = async () => {
  if (!currentUser) return alert('Please log in or register first.');
  if (cart.length === 0) return alert('Your cart is empty.');

  const items = cart.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  try {
    const response = await createOrder({
      items,
      paymentMethod,
      vat,
      totalPrice: total,
    });

     if (paymentMethod === 'paystack') {
      const paymentUrl = response?.payment_url || response?.data?.payment_url;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert('Failed to redirect to Paystack.');
        console.log('Payment URL not found in response:', response);
      }
    } else {
      setOrderId(response?.order?.order_id || 'N/A');
      setShowSuccessModal(true);
      clearCart(); // ✅ Clear cart after successful COD order
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred while placing the order.');
  }
};



  if (loading) return <div className="text-center py-20">Loading checkout...</div>

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#130447] mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Section */}
        <div className="lg:col-span-2 bg-white p-6 shadow rounded-md">
          {!currentUser ? (
            <>
              <h2 className="text-xl font-semibold text-[#130447] mb-4">Register & Checkout</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="w-full border px-4 py-2 rounded-md" />
                <input type="email" placeholder="Email" className="w-full border px-4 py-2 rounded-md" />
                <input type="tel" placeholder="Phone" className="w-full border px-4 py-2 rounded-md" />
                <input type="password" placeholder="Password" className="w-full border px-4 py-2 rounded-md" />
                <input type="text" placeholder="Address" className="w-full border px-4 py-2 rounded-md md:col-span-2" />
                <input type="text" placeholder="State" className="w-full border px-4 py-2 rounded-md" />
                <input type="text" placeholder="City" className="w-full border px-4 py-2 rounded-md" />
              </div>

              <p className="mt-6 text-sm text-center text-gray-600">
                Already have an account? <a href="/login" className="text-[#130447] font-medium hover:underline">Login</a>
              </p>

              <div className="mt-4 flex justify-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <FaGoogle className="text-red-500" />
                  <span className="text-sm">Continue with Google</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <FaFacebookF className="text-blue-600" />
                  <span className="text-sm">Continue with Facebook</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-[#130447] mb-4">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input disabled className="w-full border px-4 py-2 rounded-md" value={currentUser.name || ''} />
                <input disabled className="w-full border px-4 py-2 rounded-md" value={currentUser.email || ''} />
                {(() => {
                  const parts = currentUser.billing_address?.split(',') || []
                  const filteredAddress = parts.filter((_, i) => i !== 2).join(',').trim()
                  const removedState = parts[2]?.trim() || ''
                  return (
                    <>
                      <input
                        disabled
                        className="w-full border px-4 py-2 rounded-md md:col-span-2"
                        value={filteredAddress}
                      />
                      <input
                        disabled
                        className="w-full border px-4 py-2 rounded-md"
                        value={removedState}
                      />
                    </>
                  )
                })()}
                <input disabled className="w-full border px-4 py-2 rounded-md" value={currentUser.phone || ''} />
              </div>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-bold text-[#130447] mb-4">Order Summary</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm mb-4">Your cart is empty.</p>
          ) : (
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={Array.isArray(item.images) ? item.images[0] : item.image || '/placeholder.png'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#130447]">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ₦{item.price.toLocaleString()} x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (7.5%)</span>
              <span>₦{vat.toLocaleString()}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-[#130447] text-lg">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
            >
              <option value="paystack">Pay with Paystack</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-[#130447] text-white py-3 rounded-md hover:bg-[#0f0334] transition shadow-md text-lg font-semibold"
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-700 mb-4">Thank you for your order.</p>
            <p className="text-sm mb-2">
              <strong>Order ID:</strong> {orderId}
            </p>
            <p className="text-sm mb-4">
              We will contact you at <strong>{currentUser?.email}</strong> or <strong>{currentUser?.phone}</strong> to confirm delivery.
            </p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-[#130447] text-white px-4 py-2 rounded-md mt-4 hover:bg-[#0f0334]"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

CheckoutPage.layout = page => <AppLayout>{page}</AppLayout>
