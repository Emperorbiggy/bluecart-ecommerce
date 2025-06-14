import React, { useState, useEffect } from 'react'
import { Filter, ChevronDown } from 'lucide-react'
import { Link } from '@inertiajs/react'
import AppLayout from '../Layouts/AppLayout'
import { getAllProducts } from '../utils/api' // <-- ✅ Import your API function

export default function Products() {
  const [products, setProducts] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()

        // ✅ Group by category (make sure each product has a 'category' field)
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

  const categoryOptions = [
    { label: 'All Categories', value: 'all' },
    ...Object.keys(products).map(key => ({
      label: key.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()),
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
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
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
                {categoryOptions.map(option => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setSelectedCategory(option.value)
                      setShowDropdown(false)
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700 ${
                      selectedCategory === option.value ? 'font-semibold text-[#130447]' : ''
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Display */}
        {getFilteredProducts().map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold capitalize text-gray-800 mb-6">
              {category.replace('_', ' ')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map(product => (
                <div
                  key={product.id}
                  className="relative group overflow-hidden bg-white shadow-md rounded-lg transition hover:shadow-xl"
                >
                  <Link href={`/products/${product.id}`} className="block">
                    <img
                      src={Array.isArray(product.images) ? product.images[0] : product.image}
                      alt={product.name}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-[#130447] font-bold mt-2">
                        ₦{Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>

                  <div className="absolute inset-0 bg-[#130447]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-3">
  <button className="px-4 py-2 bg-white text-[#130447] rounded-md font-medium hover:bg-gray-100 shadow">
    Add to Cart
  </button>
  <Link
    href={`/products/${product.id}`}
    className="px-4 py-2 bg-transparent text-white border border-white rounded-md font-medium hover:bg-white hover:text-[#130447] transition"
  >
    View Details
  </Link>
</div>

                </div>
              ))}
            </div>

            {/* View More */}
            <div className="mt-6 text-center">
              <Link
                href={`/category/${category}`}
                className="inline-block px-5 py-2 rounded-full text-white bg-[#130447] hover:bg-[#100338] transition font-medium"
              >
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
