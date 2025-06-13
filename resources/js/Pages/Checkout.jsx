import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Checkout() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    payment: 'pod',
  });

  const subtotal = 51000;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Shipping Info</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded px-4 py-2"
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border rounded px-4 py-2"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              placeholder="Delivery Address"
              className="w-full border rounded px-4 py-2"
              rows={3}
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-2">Payment Method</h2>
          <select
            className="w-full border rounded px-4 py-2"
            value={form.payment}
            onChange={e => setForm({ ...form, payment: e.target.value })}
          >
            <option value="pod">Pay on Delivery</option>
            <option value="paystack">Pay with Paystack</option>
          </select>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-osunblue text-lg pt-2 border-t mt-2">
              <span>Total:</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => alert('Order placed successfully!')}
            className="mt-6 w-full bg-osunblue text-white py-2 rounded hover:bg-osunblue-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
