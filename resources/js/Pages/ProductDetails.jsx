import React, { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import AppLayout from '../Layouts/AppLayout'
import { getProductById, getRelatedProducts } from '../utils/api'

export default function ProductDetail() {
  const { props } = usePage()
  const id = props.id

  const [product, setProduct] = useState(null)
  const [mainImage, setMainImage] = useState('')
  const [fadeIn, setFadeIn] = useState(true)
  const [related, setRelated] = useState([])

  useEffect(() => {
    async function fetchProductAndRelated() {
      try {
        const data = await getProductById(id)
        setProduct(data)
        setMainImage(data.images?.[0] || '')

        const relatedData = await getRelatedProducts(id)
        setRelated(relatedData)
      } catch (err) {
        console.error('❌ Failed to fetch product or related', err)
      }
    }

    if (id) fetchProductAndRelated()
  }, [id])

  const changeImage = (img) => {
    setFadeIn(false)
    setTimeout(() => {
      setMainImage(img)
      setFadeIn(true)
    }, 100)
  }

  if (!product) {
    return (
      <AppLayout>
        <div className="py-20 text-center text-xl text-[#130447]">Loading Product...</div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      {/* Product Details */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div className="p-6">
            <div className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[450px] object-cover rounded-xl shadow-md"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6 flex-wrap">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => changeImage(img)}
                  alt={`Thumb ${index + 1}`}
                  className={`w-24 h-24 object-cover rounded-lg border-2 cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-lg ${
                    mainImage === img ? 'border-[#130447] ring-2 ring-[#130447]' : 'border-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#130447] mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold text-[#130447] mb-2">
                ₦{Number(product.price).toLocaleString()}
              </p>
              <p className="text-sm text-[#130447] font-medium mb-4">Details</p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.details}</p>
            </div>

            <button className="mt-4 w-full md:w-auto bg-[#130447] text-white px-8 py-3 rounded-lg hover:bg-[#0f0334] transition shadow-md text-lg font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-[#130447] mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {related.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden group transition hover:shadow-xl"
            >
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.images?.[0] || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-[#130447] font-bold mt-2 text-lg">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
              </Link>

              <div className="absolute inset-0 bg-[#130447]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center space-y-3">
                <button className="px-5 py-2 bg-white text-[#130447] rounded-md font-medium hover:bg-gray-100 shadow">
                  Add to Cart
                </button>
                <Link
                  href={`/products/${product.id}`}
                  className="px-5 py-2 bg-white text-[#130447] rounded-md font-medium hover:bg-gray-100 shadow"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}
