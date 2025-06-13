import React from 'react'
import { Link } from '@inertiajs/react'
import AppLayout from '../Layouts/AppLayout'

const cartItems = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: 22000,
    quantity: 2,
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

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const vat = subtotal * 0.075 // 7.5% VAT
  const total = subtotal + vat

  return (
    <AppLayout>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-[#130447] mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-gray-600">Your cart is empty.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white shadow rounded-lg overflow-hidden p-4 gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-[#130447] font-bold mt-1">₦{item.price.toLocaleString()}</p>
                    <div className="flex items-center mt-3 space-x-2">
                      <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">-</button>
                      <span className="px-4">{item.quantity}</span>
                      <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">+</button>
                    </div>
                  </div>
                  <button className="text-red-500 hover:text-red-600 font-medium">Remove</button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#130447] mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>VAT (7.5%)</span>
                  <span>₦{vat.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-[#130447] text-lg">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button className="mt-6 w-full bg-[#130447] text-white py-3 rounded-md hover:bg-[#0f0334] transition shadow-md text-lg font-semibold">
                Proceed to Checkout
              </button>
              <Link href="/" className="block text-center text-sm text-[#130447] mt-3 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </section>
    </AppLayout>
  )
}
