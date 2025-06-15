import React, { useState, useEffect } from 'react'
import { Filter, ChevronDown, ShoppingCart } from 'lucide-react'
import { Link, usePage } from '@inertiajs/react'
import { getAllProducts } from '../utils/api'
import { useCart } from '@/contexts/CartContext'
import AppLayout from '../Layouts/AppLayout'

// ✅ Product Card Component
function ProductCard({ product }) {
  const { addToCart, removeFromCart, getQuantity } = useCart()
  const quantity = getQuantity(product.id)
  const image = Array.isArray(product.images) ? product.images[0] : product.image || '/placeholder.png'

  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden w-full group">
      <img
        src={image}
        alt={product.name}
        className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-4">
        <h4 className="font-semibold text-sm mb-1 truncate">{product.name}</h4>
        <p className="text-[#130447] font-bold text-sm">₦{product.price?.toLocaleString()}</p>
      </div>
      <div className="absolute inset-0 bg-[#130447]/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
        <div className="flex flex-col items-center gap-2 px-4">
          {quantity > 0 ? (
            <div className="flex items-center gap-2 text-white">
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-white/20 border border-white rounded px-3 py-1 hover:bg-red-500 hover:text-white"
              >
                −
              </button>
              <span className="font-bold">{quantity}</span>
              <button
                onClick={() => addToCart(product)}
                className="bg-white/20 border border-white rounded px-3 py-1 hover:bg-green-500 hover:text-white"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="text-white font-semibold bg-white/20 border border-white px-4 py-2 rounded hover:bg-[#130447]/30 text-sm"
            >
              Add to Cart
            </button>
          )}
          <Link
            href={`/products/${product.id}`}
            className="text-white font-semibold bg-white/20 border border-white px-4 py-2 rounded hover:bg-[#130447]/30 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

// ✅ Main Page Component
export default function CategoryPage() {
  const { props } = usePage()
  const initialCategory = props.initialCategory || 'all'

  const [products, setProducts] = useState({})
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [showDropdown, setShowDropdown] = useState(false)
  const { getTotalItems } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        const grouped = data.reduce((acc, product) => {
          const category = product.category || 'uncategorized'
          if (!acc[category]) acc[category] = []
          acc[category].push(product)
          return acc
        }, {})
        setProducts(grouped)
      } catch (err) {
        console.error('Failed to fetch products:', err)
      }
    }

    fetchProducts()
  }, [])

  // Sync URL param category with dropdown selection
  useEffect(() => {
    setSelectedCategory(initialCategory)
  }, [initialCategory])

  const categoryOptions = [
    { label: 'All Categories', value: 'all' },
    ...Object.keys(products).map((key) => ({
      label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      value: key,
    })),
  ]

  const getFilteredProducts = () => {
    if (selectedCategory === 'all') {
      return Object.entries(products)
    }
    return [[selectedCategory, products[selectedCategory] || []]]
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header & Filter */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#130447]">Our Products</h1>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:border-[#130447] focus:outline-none"
          >
            <Filter className="h-4 w-4 mr-2 text-[#130447]" />
            Filter
            <ChevronDown className="h-4 w-4 ml-1 text-gray-600" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {categoryOptions.map((option) => (
                <Link
                  key={option.value}
                  href={option.value === 'all' ? '/category/all' : `/category/${option.value}`}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    selectedCategory === option.value ? 'font-semibold text-[#130447]' : ''
                  }`}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Sections */}
      {getFilteredProducts().map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold capitalize text-gray-800 mb-6">
            {category.replace(/_/g, ' ')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}

      {/* Floating Cart */}
      {getTotalItems() > 0 && (
        <Link
          href="/cart"
          className="fixed bottom-6 right-6 z-50 bg-[#130447] text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#100338]/90 transition"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold text-sm">{getTotalItems()} item(s)</span>
        </Link>
      )}
    </div>
  )
}

CategoryPage.layout = (page) => <AppLayout>{page}</AppLayout>
