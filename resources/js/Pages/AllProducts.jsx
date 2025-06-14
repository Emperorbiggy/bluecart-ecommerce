import { useEffect, useState } from 'react'
import AdminLayout from '../Layouts/AdminLayout'
import { getAllProducts, updateProduct } from '../utils/api'

export default function AllProducts() {
  const [activeTab, setActiveTab] = useState('all-products')
  const [products, setProducts] = useState({})
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    category: '',
    shortDescription: '',
    details: '',
    discount: '',
    imageInputType: 'url',
    images: [''],
    uploadedImages: [null],
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const data = await getAllProducts()

    const parsedProducts = data.map((product) => {
      const parsedImages =
        typeof product.images === 'string'
          ? JSON.parse(product.images)
          : product.images
      return { ...product, images: parsedImages }
    })

    const grouped = parsedProducts.reduce((acc, product) => {
      const key = product.category || 'uncategorized'
      if (!acc[key]) acc[key] = []
      acc[key].push(product)
      return acc
    }, {})

    setProducts(grouped)
    setLoading(false)
  }

  const openEditModal = (product) => {
    const parsedImages =
      typeof product.images === 'string'
        ? JSON.parse(product.images)
        : Array.isArray(product.images)
        ? product.images
        : ['']

    setEditingProduct(product)
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      shortDescription: product.short_description || '',
      details: product.details || '',
      discount: product.discount || '',
      imageInputType: 'url',
      images: parsedImages,
      uploadedImages: [null],
    })
  }

  const closeEditModal = () => {
    setEditingProduct(null)
  }

  const handleUpdate = async () => {
  try {
    let payload

    if (editForm.imageInputType === 'upload') {
      payload = new FormData()
      payload.append('name', editForm.name)
      payload.append('price', editForm.price)
      payload.append('category', editForm.category)
      payload.append('discount', editForm.discount)
      payload.append('short_description', editForm.shortDescription) // ✅ fixed
      payload.append('details', editForm.details) // ✅ already correct

      editForm.uploadedImages.forEach((file, i) => {
        if (file) payload.append('images[]', file)
      })
    } else {
      payload = {
        name: editForm.name,
        price: editForm.price,
        category: editForm.category,
        discount: editForm.discount,
        short_description: editForm.shortDescription, // ✅ fixed
        details: editForm.details, // ✅ already correct
        images: editForm.images,
      }
    }

    await updateProduct(editingProduct.id, payload)
    closeEditModal()
    fetchProducts()
  } catch (error) {
    alert('Update failed')
    console.error(error)
  }
}


  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <h2 className="text-2xl font-semibold text-osunblue mb-6">
        All Products
      </h2>

      {loading ? (
        <p>Loading products...</p>
      ) : Object.entries(products).length === 0 ? (
        <p>No products found.</p>
      ) : (
        Object.entries(products).map(([category, items]) => (
          <div key={category} className="mb-10">
            <h3 className="text-lg font-bold capitalize text-gray-700 mb-4">
              {category.replace('_', ' ')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <div
                  key={`${category}-${product.id}-${product.name}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  <img
                    src={product.images?.[0] || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
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
                    <button
                      onClick={() => openEditModal(product)}
                      className="mt-4 bg-osunblue hover:bg-blue-900 text-white text-sm px-4 py-2 rounded-md transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Edit Product: {editingProduct.name}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdate()
              }}
            >
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {/* Discount */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={editForm.discount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, discount: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {/* Short Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Short Description
                </label>
                <textarea
                  value={editForm.shortDescription}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      shortDescription: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={2}
                />
              </div>

              {/* Details */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Details
                </label>
                <textarea
                  value={editForm.details}
                  onChange={(e) =>
                    setEditForm({ ...editForm, details: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={4}
                />
              </div>

              {/* Image Input Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image Input Type
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="imageInputType"
                      value="url"
                      checked={editForm.imageInputType === 'url'}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          imageInputType: e.target.value,
                        })
                      }
                    />
                    <span className="ml-1">Image URL</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="imageInputType"
                      value="upload"
                      checked={editForm.imageInputType === 'upload'}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          imageInputType: e.target.value,
                        })
                      }
                    />
                    <span className="ml-1">Upload File</span>
                  </label>
                </div>
              </div>

              {/* Images Section */}
              <div className="mb-4">
                {editForm.imageInputType === 'url' &&
                  editForm.images.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => {
                          const updated = [...editForm.images]
                          updated[index] = e.target.value
                          setEditForm({ ...editForm, images: updated })
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                      />
                      {editForm.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = editForm.images.filter(
                              (_, i) => i !== index
                            )
                            setEditForm({ ...editForm, images: updated })
                          }}
                          className="text-red-500"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}

                {editForm.imageInputType === 'upload' &&
                  editForm.uploadedImages.map((_, index) => (
                    <input
                      key={index}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const updated = [...editForm.uploadedImages]
                        updated[index] = e.target.files[0]
                        setEditForm({ ...editForm, uploadedImages: updated })
                      }}
                      className="w-full mb-2"
                    />
                  ))}

                <button
                  type="button"
                  className="text-sm text-blue-600 mt-2"
                  onClick={() => {
                    if (editForm.imageInputType === 'url') {
                      setEditForm({
                        ...editForm,
                        images: [...editForm.images, ''],
                      })
                    } else {
                      setEditForm({
                        ...editForm,
                        uploadedImages: [...editForm.uploadedImages, null],
                      })
                    }
                  }}
                >
                  Add More Images
                </button>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-osunblue text-white rounded-md hover:bg-blue-900"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
