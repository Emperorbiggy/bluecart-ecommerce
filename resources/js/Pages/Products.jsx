import React, { useState } from 'react'
import { Filter, ChevronDown } from 'lucide-react'
import { Link } from '@inertiajs/react'
import AppLayout from '../Layouts/AppLayout'


const products = {
  branded: [
    { id: 1, name: 'Laptops', price: 9500, image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop' },
    { id: 2, name: 'Running Shoes', price: 15000, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop' },
    { id: 3, name: 'Perfume Spray', price: 4500, image: 'https://images.unsplash.com/photo-1699723018826-f77ad1d78f28?q=80&w=1964&auto=format&fit=crop' },
    { id: 10, name: 'Smartphone', price: 65000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1974&auto=format&fit=crop' },
    { id: 10, name: 'Power Banks', price: 65000, image: 'https://images.unsplash.com/photo-1745889763766-037ad5b456e2?q=80&w=1936&auto=format&fit=crop' },
    { id: 10, name: 'EarPod', price: 65000, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop' },
  ],
  clothing: [
    { id: 4, name: 'Men’s Shirt', price: 7000, image: 'https://images.unsplash.com/photo-1602810320073-1230c46d89d4?q=80&w=1974&auto=format&fit=crop' },
    { id: 5, name: 'Women’s Dress', price: 11000, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop' },
    { id: 11, name: 'Winter Jacket', price: 17000, image: 'https://images.unsplash.com/photo-1706765779494-2705542ebe74?q=80&w=1951&auto=format&fit=crop' },
    { id: 11, name: 'Night wear', price: 17000, image: 'https://images.unsplash.com/photo-1584061606850-a57652a323a4?q=80&w=1935&auto=format&fit=crop' },
    { id: 11, name: 'Joggers', price: 17000, image: 'https://images.unsplash.com/photo-1580906853305-5702e648164e?q=80&w=1974&auto=format&fit=crop' },
  ],
  gadgets: [
    { id: 6, name: 'Wireless Earbuds', price: 22000, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop' },
    { id: 7, name: 'Bluetooth Speaker', price: 18000, image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1974&auto=format&fit=crop' },
    { id: 12, name: 'Centered Table', price: 32000, image: 'https://images.unsplash.com/photo-1522668261254-d408d69b39cd?q=80&w=2080&auto=format&fit=crop' },
    { id: 12, name: 'Smart TV', price: 32000, image: 'https://images.unsplash.com/photo-1646861039459-fd9e3aabf3fb?q=80&w=1926&auto=format&fit=crop' },
    { id: 12, name: 'Headphones', price: 32000, image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070&auto=format&fit=crop' },
  ],
  home_appliances: [
    { id: 8, name: 'Air Conditioner', price: 120000, image: 'https://images.unsplash.com/photo-1665826254141-bfa10685e002?q=80&w=2070&auto=format&fit=crop' },
    { id: 9, name: 'Blender', price: 18000, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=2105&auto=format&fit=crop' },
    { id: 13, name: 'Microwave Oven', price: 40000, image: 'https://plus.unsplash.com/premium_photo-1673439305380-79947d273735?q=80&w=1974&auto=format&fit=crop' },
    { id: 13, name: 'Gas Cooker', price: 40000, image: 'https://images.unsplash.com/photo-1609211373254-b52e03ba0c85?q=80&w=1976&auto=format&fit=crop' },
    { id: 13, name: 'Electronic Cooker', price: 40000, image: 'https://images.unsplash.com/photo-1738220543088-aa5b0f83733b?q=80&w=2070&auto=format&fit=crop' },
  ],
}

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showDropdown, setShowDropdown] = useState(false)

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
    return [[selectedCategory, products[selectedCategory]]]
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#130447]">Our Products</h1>

          {/* Filter dropdown trigger */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:border-[#130447] focus:outline-none"
            >
              <Filter className="h-4 w-4 mr-2 text-[#130447]" />
              Filter
              <ChevronDown className="h-4 w-4 ml-1 text-gray-600" />
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {categoryOptions.map((option) => (
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
      {items.map((product) => (
        <div key={product.id} className="relative group overflow-hidden bg-white shadow-md rounded-lg transition hover:shadow-xl">
          <Link href={`/products/${product.id}`} className="block">
            <img src={product.image} alt={product.name} className="w-full h-52 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-[#130447] font-bold mt-2">₦{product.price.toLocaleString()}</p>
            </div>
          </Link>

          <div className="absolute inset-0 bg-[#130447]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="px-4 py-2 bg-white text-[#130447] rounded-md font-medium hover:bg-gray-100 shadow">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* View More Button */}
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