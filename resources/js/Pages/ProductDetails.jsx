import { Link, usePage } from '@inertiajs/react';

export default function ProductDetails() {
  // Simulate props from Laravel backend
  const product = {
    id: 1,
    name: 'Smart Watch Series X',
    price: 21000,
    oldPrice: 30000,
    description: `Stay connected and stylish with the Smart Watch Series X. Track your health, receive notifications, and enjoy seamless pairing with your smartphone.`,
    image: 'https://via.placeholder.com/500x500?text=Smart+Watch',
    gallery: [
      'https://via.placeholder.com/120x120?text=View+1',
      'https://via.placeholder.com/120x120?text=View+2',
      'https://via.placeholder.com/120x120?text=View+3',
    ],
  };

  const related = [
    {
      id: 2,
      name: 'Wireless Earbuds',
      price: 15000,
      image: 'https://via.placeholder.com/300x300?text=Earbuds',
    },
    {
      id: 3,
      name: 'Fitness Tracker',
      price: 13000,
      image: 'https://via.placeholder.com/300x300?text=Tracker',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline text-osunblue">Home</Link> &gt; <span>Product Details</span>
      </div>

      {/* Product Info */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-12 items-start">
        {/* Image and Gallery */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow"
          />
          <div className="flex gap-4 mt-4">
            {product.gallery.map((img, i) => (
              <img key={i} src={img} alt={`Gallery ${i}`} className="w-20 h-20 rounded border cursor-pointer" />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          {product.oldPrice && (
            <p className="text-sm text-gray-500 mt-1 line-through">₦{product.oldPrice.toLocaleString()}</p>
          )}
          <p className="text-osunblue text-2xl font-bold mt-1">₦{product.price.toLocaleString()}</p>

          <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>

          <button
            className="mt-6 bg-osunblue hover:bg-osunblue-600 text-white px-6 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">You may also like</h2>
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {related.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow w-60 shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t" />
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-800 truncate">{item.name}</h4>
                <p className="text-osunblue font-bold text-sm mt-1">₦{item.price.toLocaleString()}</p>
                <Link
                  href={`/products/${item.id}`}
                  className="inline-block mt-3 text-xs text-white bg-osunblue px-3 py-1 rounded hover:bg-osunblue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
