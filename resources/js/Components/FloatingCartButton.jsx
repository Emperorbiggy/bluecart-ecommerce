// components/FloatingCartButton.jsx
import { useCart } from '../contexts/CartContext'
import { ShoppingBag } from 'lucide-react' // or any icon lib
import { useState } from 'react'

export default function FloatingCartButton({ onClick }) {
  const { cart } = useCart()

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-[#130447] text-white p-3 rounded-full shadow-lg flex items-center gap-2"
    >
      <ShoppingBag size={20} />
      {totalItems > 0 && (
        <span className="bg-white text-[#130447] font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  )
}
