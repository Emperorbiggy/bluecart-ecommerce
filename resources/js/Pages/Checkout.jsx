import React, { useState } from 'react'
import AppLayout from '../Layouts/AppLayout'
import { Link } from '@inertiajs/react'

const mockCartItems = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: 22000,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Bluetooth Speaker',
    price: 18000,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1974&auto=format&fit=crop',
  },
]

export default function CheckoutPage() {
  const isLoggedIn = false // Replace with actual auth check
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const totalAmount = mockCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#130447] mb-8">Checkout</h1>

        {/* Cart Summary */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[#130447]">Your Cart</h2>
          <div className="grid grid-cols-1 gap-6">
            {mockCartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center border rounded-lg p-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-lg font-bold text-[#130447]">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing/Registration Section */}
        <div className="bg-white p-6 rounded-md shadow-md">
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

              {/* Already have account */}
              <div className="mt-6 text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-[#130447] font-medium hover:underline">
                  Log in here
                </a>
              </div>

              {/* Social Auth */}
              <div className="mt-4 flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
                  <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" />
                  <span>Google</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
                  <img src="https://img.icons8.com/color/24/facebook.png" alt="Facebook" />
                  <span>Facebook</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-[#130447] mb-4">Billing Details</h2>
              <p className="text-gray-700 mb-2">Name: John Doe</p>
              <p className="text-gray-700 mb-2">Email: john@example.com</p>
              <p className="text-gray-700 mb-2">Address: 1234 Sample Street, City, State</p>
            </>
          )}

          {/* Payment Method */}
          <div className="mt-6">
            <label className="block mb-2 font-medium text-gray-700">Select Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
            >
              <option value="cash">Cash on Delivery</option>
              <option value="paystack">Pay with Paystack</option>
            </select>
          </div>

          {/* Confirm Button */}
          <button className="mt-6 w-full bg-[#130447] text-white py-3 rounded-md font-medium hover:bg-[#11033a] transition">
            Confirm & Pay ₦{totalAmount.toLocaleString()}
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
