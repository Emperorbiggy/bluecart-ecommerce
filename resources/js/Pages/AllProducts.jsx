// pages/AllProducts.jsx
import { useState } from 'react'
import AdminLayout from '../Layouts/AdminLayout'

const products = {
  branded: [
    {
      id: 1,
      name: 'Laptops',
      price: 9500,
      image:
        'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Running Shoes',
      price: 15000,
      image:
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Perfume Spray',
      price: 4500,
      image:
        'https://images.unsplash.com/photo-1699723018826-f77ad1d78f28?q=80&w=1964&auto=format&fit=crop',
    },
    {
      id: 4,
      name: 'Smartphone',
      price: 65000,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 5,
      name: 'Power Banks',
      price: 65000,
      image:
        'https://images.unsplash.com/photo-1745889763766-037ad5b456e2?q=80&w=1936&auto=format&fit=crop',
    },
    {
      id: 6,
      name: 'EarPod',
      price: 65000,
      image:
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop',
    },
  ],
  clothing: [
    {
      id: 7,
      name: 'Men’s Shirt',
      price: 7000,
      image:
        'https://images.unsplash.com/photo-1602810320073-1230c46d89d4?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 8,
      name: 'Women’s Dress',
      price: 11000,
      image:
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop',
    },
    {
      id: 9,
      name: 'Winter Jacket',
      price: 17000,
      image:
        'https://images.unsplash.com/photo-1706765779494-2705542ebe74?q=80&w=1951&auto=format&fit=crop',
    },
    {
      id: 10,
      name: 'Night wear',
      price: 17000,
      image:
        'https://images.unsplash.com/photo-1584061606850-a57652a323a4?q=80&w=1935&auto=format&fit=crop',
    },
    {
      id: 11,
      name: 'Joggers',
      price: 17000,
      image:
        'https://images.unsplash.com/photo-1580906853305-5702e648164e?q=80&w=1974&auto=format&fit=crop',
    },
  ],
  gadgets: [
    {
      id: 12,
      name: 'Wireless Earbuds',
      price: 22000,
      image:
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop',
    },
    {
      id: 13,
      name: 'Bluetooth Speaker',
      price: 18000,
      image:
        'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 14,
      name: 'Centered Table',
      price: 32000,
      image:
        'https://images.unsplash.com/photo-1522668261254-d408d69b39cd?q=80&w=2080&auto=format&fit=crop',
    },
    {
      id: 15,
      name: 'Smart TV',
      price: 32000,
      image:
        'https://images.unsplash.com/photo-1646861039459-fd9e3aabf3fb?q=80&w=1926&auto=format&fit=crop',
    },
    {
      id: 16,
      name: 'Headphones',
      price: 32000,
      image:
        'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070&auto=format&fit=crop',
    },
  ],
  home_appliances: [
    {
      id: 17,
      name: 'Air Conditioner',
      price: 120000,
      image:
        'https://images.unsplash.com/photo-1665826254141-bfa10685e002?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 18,
      name: 'Blender',
      price: 18000,
      image:
        'https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=2105&auto=format&fit=crop',
    },
    {
      id: 19,
      name: 'Microwave Oven',
      price: 40000,
      image:
        'https://plus.unsplash.com/premium_photo-1673439305380-79947d273735?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 20,
      name: 'Gas Cooker',
      price: 40000,
      image:
        'https://images.unsplash.com/photo-1609211373254-b52e03ba0c85?q=80&w=1976&auto=format&fit=crop',
    },
    {
      id: 21,
      name: 'Electronic Cooker',
      price: 40000,
      image:
        'https://images.unsplash.com/photo-1738220543088-aa5b0f83733b?q=80&w=2070&auto=format&fit=crop',
    },
  ],
}

export default function AllProducts() {
  const [activeTab, setActiveTab] = useState('all-products')

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <h2 className="text-2xl font-semibold text-osunblue mb-6">
        All Products
      </h2>

      {Object.entries(products).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h3 className="text-lg font-bold capitalize text-gray-700 mb-4">
            {category.replace('_', ' ')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <div
                key={`${category}-${product.id}-${product.name}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    ₦{product.price.toLocaleString()}
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </AdminLayout>
  )
}
