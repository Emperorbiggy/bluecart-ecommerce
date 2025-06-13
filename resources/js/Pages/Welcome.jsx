// resources/js/Pages/Home.jsx

import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const heroSlides = [
  {
    id: 1,
    image: 'https://via.placeholder.com/1600x600?text=Style+1',
    title: 'Discover Endless Style',
    description: 'Shop curated selections of fashion, gadgets, and accessories.',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/1600x600?text=Style+2',
    title: 'Best Prices. Fast Delivery.',
    description: 'Get unbeatable deals on everything you love.',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/1600x600?text=Style+3',
    title: 'Quality You Trust',
    description: 'Only verified vendors. Guaranteed satisfaction.',
  },
];

const products = {
  branded: [
    { id: 1, name: 'Body Massager', price: 9500, image: 'https://via.placeholder.com/300x300?text=Massager' },
    { id: 2, name: 'Running Shoes', price: 15000, image: 'https://via.placeholder.com/300x300?text=Shoes' },
    { id: 3, name: 'Perfume Spray', price: 4500, image: 'https://via.placeholder.com/300x300?text=Perfume' },
  ],
  clothing: [
    { id: 4, name: 'Men’s Shirt', price: 7000, image: 'https://via.placeholder.com/300x300?text=Shirt' },
    { id: 5, name: 'Women’s Dress', price: 11000, image: 'https://via.placeholder.com/300x300?text=Dress' },
  ],
  gadgets: [
    { id: 6, name: 'Wireless Earbuds', price: 22000, image: 'https://via.placeholder.com/300x300?text=Earbuds' },
    { id: 7, name: 'Bluetooth Speaker', price: 18000, image: 'https://via.placeholder.com/300x300?text=Speaker' },
  ],
};

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
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = heroSlides[currentSlide];

  return (
    <>
      {/* Hero Slider Full Width */}
      <section
        className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${current.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-osunblue/60 backdrop-brightness-75"></div>

        {/* Content */}
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
              src="https://via.placeholder.com/160x160?text=30%25+OFF"
              alt="30% OFF"
              className="absolute right-6 bottom-4 w-32 md:w-40"
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm w-full mx-auto">
            <img
              src="https://via.placeholder.com/400x300?text=Smart+Watch+Series+X"
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

      {/* Product Sections */}
      <div className="max-w-7xl mx-auto py-16 px-4 space-y-20">
        {Object.entries(products).map(([category, items]) => (
          <div key={category}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold capitalize text-gray-800">{category} Deals</h2>
              <Link href={`/category/${category}`} className="text-osunblue text-sm hover:underline">View All</Link>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
              {items.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

Home.layout = (page) => <AppLayout>{page}</AppLayout>;
