// resources/js/Pages/Cart.jsx
import React from 'react'
import { useCart } from '@/contexts/CartContext'
import AppLayout from '../Layouts/AppLayout'
import { Link } from '@inertiajs/react'

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart()

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const vat = subtotal * 0.075
  const total = subtotal + vat

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#130447] mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white shadow rounded-lg overflow-hidden p-4 gap-4"
              >
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-[#130447] font-bold mt-1">₦{item.price.toLocaleString()}</p>
                  <div className="flex items-center mt-3 space-x-2">
                    <button
                      onClick={() => addToCart({ ...item, quantity: -1 })}
                      className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Remove
                </button>
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

            <Link
  href="/checkout"
  className="mt-6 w-full bg-[#130447] text-white py-3 rounded-md hover:bg-[#0f0334] transition shadow-md text-lg font-semibold text-center block"
>
  Proceed to Checkout
</Link>

            <Link href="/products" className="block text-center text-sm text-[#130447] mt-3 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

// ✅ Tell Inertia to use AppLayout
CartPage.layout = (page) => <AppLayout>{page}</AppLayout>
