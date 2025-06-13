import { Link } from '@inertiajs/react';

const cartItems = [
  {
    id: 1,
    name: 'Smart Watch Series X',
    price: 21000,
    quantity: 1,
    image: 'https://via.placeholder.com/100x100?text=Watch',
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: 15000,
    quantity: 2,
    image: 'https://via.placeholder.com/100x100?text=Earbuds',
  },
];

export default function Cart() {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded object-cover" />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">₦{item.price.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <button className="px-2 border rounded">-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button className="px-2 border rounded">+</button>
                </div>
              </div>
              <button className="text-red-500 hover:underline text-sm">Remove</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary</h2>
          <p className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal:</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between font-bold text-osunblue text-lg">
            <span>Total:</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </p>
          <Link
            href="/checkout"
            className="block mt-6 w-full text-center bg-osunblue text-white py-2 rounded hover:bg-osunblue-600"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
