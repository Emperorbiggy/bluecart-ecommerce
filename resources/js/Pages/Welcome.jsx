import { useEffect, useState } from 'react';
import { getAllProducts } from '../utils/api'; // ✅ import utility
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ShoppingBag, Shirt, Headphones, Home as HomeIcon } from 'lucide-react';

const categoryIcons = {
  branded: ShoppingBag,
  clothing: Shirt,
  gadgets: Headphones,
  home_appliances: HomeIcon,
};

function ProductCard({ product }) {
  const image = Array.isArray(product.images) ? product.images[0] : product.image;

  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden w-60 shrink-0 group">
      <img
        src={image}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="p-4">
        <h4 className="font-semibold text-sm mb-1 truncate">{product.name}</h4>
        <p className="text-osunblue font-bold text-sm">
          ₦{product.price?.toLocaleString()}
        </p>
      </div>

      <div className="absolute inset-0 bg-[#130447]/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
        <div className="flex flex-col items-center gap-2 px-4">
          <button className="text-white font-semibold bg-white/20 border border-white px-4 py-2 rounded hover:bg-osunblue/30 text-sm">
            Add to Cart
          </button>
          <Link
            href={`/products/${product.id}`}
            className="text-white font-semibold bg-white/20 border border-white px-4 py-2 rounded hover:bg-osunblue/30 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

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
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();

        // Group by category
        const grouped = products.reduce((acc, product) => {
          const cat = product.category || 'uncategorized';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(product);
          return acc;
        }, {});

        setProductsByCategory(grouped);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = heroSlides[currentSlide];

  return (
    <>
      {/* Existing Hero Section */}
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

      {/* Featured Categories (dynamic) */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-[#130447] mb-6">Featured Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Object.keys(productsByCategory).map((category) => {
            const Icon = categoryIcons[category] || ShoppingBag;
            return (
              <Link
                key={category}
                href={`/category/${category}`}
                className="group rounded-xl bg-white p-6 shadow transition-all hover:shadow-xl transform hover:-translate-y-1 border border-transparent hover:border-osunblue"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-osunblue/10 p-4 rounded-full mb-4 group-hover:bg-osunblue transition-all duration-300">
                    <Icon className="w-8 h-8 text-osunblue group-hover:text-white transition" />
                  </div>
                  <span className="text-sm font-semibold text-osunblue group-hover:text-osunblue-700 capitalize transition">
                    {category.replace(/_/g, ' ')}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto py-16 px-4 space-y-20">
        {Object.entries(productsByCategory).map(([category, items]) => (
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
  );
}

Home.layout = (page) => <AppLayout>{page}</AppLayout>;
