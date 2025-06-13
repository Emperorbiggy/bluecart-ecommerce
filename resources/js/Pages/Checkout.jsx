import React, { useState } from 'react'
import { FaGoogle, FaFacebookF } from 'react-icons/fa'
import AppLayout from '../Layouts/AppLayout'

// Sample cart data
const cartItems = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: 22000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Bluetooth Speaker',
    price: 18000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1974&auto=format&fit=crop',
  },
]

export default function CheckoutPage() {
  const isLoggedIn = false // Toggle this to simulate auth
  const [paymentMethod, setPaymentMethod] = useState('paystack')

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vat = Math.round(subtotal * 0.075)
  const total = subtotal + vat

  return (
    <AppLayout>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-[#130447] mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Section */}
          <div className="lg:col-span-2 bg-white p-6 shadow rounded-md">
            {!isLoggedIn ? (
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

                {/* Already have an account */}
                <p className="mt-6 text-sm text-center text-gray-600">
                  Already have an account? <a href="/login" className="text-[#130447] font-medium hover:underline">Login</a>
                </p>

                {/* Social Buttons */}
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
                  <input disabled className="w-full border px-4 py-2 rounded-md" defaultValue="John Doe" />
                  <input disabled className="w-full border px-4 py-2 rounded-md" defaultValue="john@example.com" />
                  <input className="w-full border px-4 py-2 rounded-md md:col-span-2" defaultValue="123 Lekki, Lagos" />
                  <input className="w-full border px-4 py-2 rounded-md" defaultValue="08012345678" />
                  <input className="w-full border px-4 py-2 rounded-md" defaultValue="Lagos" />
                </div>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="bg-white p-6 shadow rounded-md">
            <h2 className="text-xl font-bold text-[#130447] mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#130447]">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ₦{item.price.toLocaleString()} x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
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

            {/* Payment Method */}
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

            {/* Confirm Button */}
            <button className="mt-6 w-full bg-[#130447] text-white py-3 rounded-md hover:bg-[#0f0334] transition shadow-md text-lg font-semibold">
              Confirm & Pay
            </button>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}
