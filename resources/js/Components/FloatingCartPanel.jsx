// components/FloatingCartPanel.jsx
import { useCart } from '../contexts/CartContext'

export default function FloatingCartPanel({ onClose }) {
  const { cart, addToCart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) return null

  return (
    <div className="fixed bottom-20 right-6 bg-white shadow-xl p-4 rounded-lg w-80 max-h-[70vh] overflow-y-auto z-50 border border-gray-200">
      <h2 className="text-lg font-bold text-[#130447] mb-2">Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b py-2">
          <div>
            <h4 className="font-semibold">{item.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <button onClick={() => removeFromCart(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addToCart(item)} className="px-2 py-1 bg-gray-200 rounded">+</button>
            </div>
          </div>
          <div className="font-medium text-sm">₦{(item.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}
      <div className="mt-4 flex justify-between items-center">
        <div className="font-bold">Total:</div>
        <div className="text-[#130447] font-bold">₦{total.toFixed(2)}</div>
      </div>
      <button
        onClick={() => alert('Checkout logic')}
        className="mt-4 w-full bg-[#130447] text-white py-2 rounded"
      >
        Checkout
      </button>
    </div>
  )
}
