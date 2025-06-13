import { Link } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import { useEffect, useState } from 'react'
import { ShoppingBag, Shirt, Headphones, Home as HomeIcon } from 'lucide-react'

// Sample product data
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
    { id: 8, name: 'Air Conditioner', price: 120000, image: 'https://images.unsplash.com/photo-1665826254141-bfa10685e002?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 9, name: 'Blender', price: 18000, image: 'https://images.unsplash.com/photo-1606811842775-025bdf8d2848?q=80&w=1932&auto=format&fit=crop' },
    { id: 13, name: 'Microwave Oven', price: 40000, image: 'https://images.unsplash.com/photo-1585951237317-2b5b0aaeb5d0?q=80&w=1932&auto=format&fit=crop' },
    { id: 13, name: 'Microwave Oven', price: 40000, image: 'https://images.unsplash.com/photo-1585951237317-2b5b0aaeb5d0?q=80&w=1932&auto=format&fit=crop' },
    { id: 13, name: 'Microwave Oven', price: 40000, image: 'https://images.unsplash.com/photo-1585951237317-2b5b0aaeb5d0?q=80&w=1932&auto=format&fit=crop' },
  ],
}

const categoryIcons = {
  branded: ShoppingBag,
  clothing: Shirt,
  gadgets: Headphones,
  home_appliances: HomeIcon,
}

const heroSlides = [
  {
    title: 'Discover Endless Style',
    description: 'Shop curated selections of fashion, gadgets, and accessories. Best prices. Fast delivery. Quality you trust.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Tech Gadgets & Accessories',
    description: 'Explore our range of cutting-edge gadgets at unbeatable prices.',
    image: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Stay Trendy, Stay Cool',
    description: 'Browse the latest fashion pieces tailored for you.',
    image: 'https://images.unsplash.com/photo-1487744480471-9ca1bca6fb7d?q=80&w=2091&auto=format&fit=crop',
  },
]

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden w-60 shrink-0">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="font-semibold text-sm mb-1 truncate">{product.name}</h4>
        <p className="text-osunblue font-bold text-sm">₦{product.price.toLocaleString()}</p>
        <Link
          href={`/products/${product.id}`}
          className="text-xs mt-3 inline-block text-white bg-osunblue px-3 py-1 rounded hover:bg-osunblue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const current = heroSlides[currentSlide]

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-screen h-[500px] md:h-[600px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${current.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-osunblue/60 backdrop-brightness-75"></div>
        <div className="relative z-10 px-4 w-full max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{current.title}</h1>
          <p className="text-white/90 text-base md:text-lg mb-6">{current.description}</p>
          <Link
            href="/products"
            className="inline-block bg-white text-osunblue font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="bg-yellow-100 rounded-xl p-6 md:p-10 shadow-md relative overflow-hidden">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">🔥 Deal of the Day</h3>
            <p className="text-gray-600 mt-2 text-base">
              Save <span className="font-bold text-osunblue">30%</span> on top-rated items today!
            </p>
            <Link
              href="/deals"
              className="mt-6 inline-block bg-osunblue text-white px-6 py-2 rounded hover:bg-osunblue-600 text-sm"
            >
              Shop All Deals
            </Link>
            <img
              src="https://images.unsplash.com/photo-1532795986-dbef1643a596?q=80&w=1974&auto=format&fit=crop"
              alt="30% OFF"
              className="absolute right-6 bottom-4 w-32 md:w-40"
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm w-full mx-auto">
            <img
              src="https://images.unsplash.com/photo-1613177794106-be20802b11d3?q=80&w=1974&auto=format&fit=crop"
              alt="Smart Watch"
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-800">Smart Watch Series X</h4>
              <p className="text-gray-500 text-sm line-through mt-1">₦30,000</p>
              <p className="text-osunblue font-bold text-lg">₦21,000</p>
              <Link
                href="/products/99"
                className="inline-block mt-3 text-sm text-white bg-osunblue px-4 py-2 rounded hover:bg-osunblue-600"
              >
                View Deal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Object.keys(products).map((category) => {
            const Icon = categoryIcons[category] || ShoppingBag
            return (
              <Link
                key={category}
                href={`/category/${category}`}
                className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-6 hover:shadow-md transition text-center group"
              >
                <div className="bg-osunblue/10 p-4 rounded-full mb-3 group-hover:bg-osunblue/20 transition">
                  <Icon className="w-8 h-8 text-osunblue" />
                </div>
                <span className="text-osunblue font-semibold capitalize">{category.replace(/_/g, ' ')}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto py-16 px-4 space-y-20">
        {Object.entries(products).map(([category, items]) => (
          <div key={category}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold capitalize text-gray-800">{category.replace(/_/g, ' ')} Deals</h2>
              <Link href={`/category/${category}`} className="text-osunblue text-sm hover:underline">
                View All
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

Home.layout = (page) => <AppLayout>{page}</AppLayout>
