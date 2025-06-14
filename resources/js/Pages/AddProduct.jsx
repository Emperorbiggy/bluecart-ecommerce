import { useState } from 'react'
import AdminLayout from '../Layouts/AdminLayout'
import { addProduct } from '../utils/api' // <-- import your api helper

export default function AddProduct() {
  const [activeTab, setActiveTab] = useState('app-product')

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '', // ✅ Added
    shortDescription: '',
    details: '',
    discount: '',
    images: [''],
    imageInputType: 'url', // 'url' or 'upload'
    uploadedImages: [null],
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const priceNum = parseFloat(formData.price) || 0
  const discountNum = parseFloat(formData.discount) || 0
  const discountedPrice = priceNum - (priceNum * discountNum) / 100

  const handleChange = (e, index = null) => {
    const { name, value, files } = e.target

    if (name === 'images') {
      const images = [...formData.images]
      images[index] = value
      setFormData((prev) => ({ ...prev, images }))
    } else if (name === 'uploadedImages') {
      const uploaded = [...formData.uploadedImages]
      uploaded[index] = files[0]
      setFormData((prev) => ({ ...prev, uploadedImages: uploaded }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
      uploadedImages: [...prev.uploadedImages, null],
    }))
  }

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    const newUploaded = formData.uploadedImages.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      images: newImages,
      uploadedImages: newUploaded,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    // Prepare product data as expected by addProduct API function
    const productToSubmit = {
      ...formData,
      price: priceNum,
      discount: discountNum,
      images:
        formData.imageInputType === 'url'
          ? formData.images.filter((url) => url.trim() !== '')
          : undefined,
      uploadedImages:
        formData.imageInputType === 'upload'
          ? formData.uploadedImages.filter((file) => file !== null)
          : undefined,
    }

    try {
      await addProduct(productToSubmit)
      setSuccess('Product added successfully!')
      setFormData({
        name: '',
        price: '',
        category: '',
        shortDescription: '',
        details: '',
        discount: '',
        images: [''],
        uploadedImages: [null],
        imageInputType: 'url',
      })
    } catch (err) {
      console.error(err)
      setError('Failed to add product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="w-full flex flex-col items-center mt-12 px-4">
        <h2 className="text-2xl font-semibold text-osunblue mb-6 text-center">
          Add New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl w-full mx-auto space-y-6 bg-white p-6 rounded shadow"
        >
          {/* Display success or error */}
          {success && (
            <div className="p-2 mb-4 text-green-800 bg-green-100 rounded">{success}</div>
          )}
          {error && (
            <div className="p-2 mb-4 text-red-800 bg-red-100 rounded">{error}</div>
          )}

          {/* Product Name */}
          <div>
            <label className="block font-medium mb-1" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-osunblue"
              placeholder="Enter product name"
              disabled={loading}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1" htmlFor="price">
              Price (₦)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-osunblue"
              placeholder="Enter price"
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1" htmlFor="category">
              Product Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-osunblue"
              disabled={loading}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Branded">Branded</option>
              <option value="Clothing">Clothing</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Home Appliances">Home Appliances</option>
            </select>
          </div>

          {/* Discount */}
          <div>
            <label className="block font-medium mb-1" htmlFor="discount">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              min="0"
              max="100"
              value={formData.discount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-osunblue"
              placeholder="Enter discount percentage"
              disabled={loading}
            />
            {formData.discount && (
              <p className="mt-1 text-green-700 font-semibold">
                Discounted Price: ₦{discountedPrice.toLocaleString()}
              </p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block font-medium mb-1" htmlFor="shortDescription">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              id="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-osunblue"
              placeholder="Brief description of the product"
              disabled={loading}
            />
          </div>

          {/* Details */}
          <div>
            <label className="block font-medium mb-1" htmlFor="details">
              Details
            </label>
            <textarea
              name="details"
              id="details"
              value={formData.details}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-osunblue"
              placeholder="Detailed description and specifications"
              disabled={loading}
            />
          </div>

          {/* Image Input Type Selection */}
          <div>
            <label className="block font-medium mb-2">Select Image Type</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="imageInputType"
                  value="url"
                  checked={formData.imageInputType === 'url'}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span>Image URL</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="imageInputType"
                  value="upload"
                  checked={formData.imageInputType === 'upload'}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span>Upload File</span>
              </label>
            </div>
          </div>

          {/* Images Section */}
          <div>
            <label className="block font-medium mb-1">
              Product Images ({formData.imageInputType === 'url' ? 'URLs' : 'Upload Files'})
            </label>

            {formData.imageInputType === 'url' &&
              formData.images.map((url, index) => (
                <div key={index} className="flex items-center mb-2 space-x-2">
                  <input
                    type="url"
                    name="images"
                    value={url}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Image URL"
                    className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-osunblue"
                    disabled={loading}
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="text-red-500 hover:text-red-700 font-bold px-2"
                      title="Remove this image"
                      disabled={loading}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}

            {formData.imageInputType === 'upload' &&
              formData.uploadedImages.map((_, index) => (
                <div key={index} className="flex items-center mb-2 space-x-2">
                  <input
                    type="file"
                    name="uploadedImages"
                    accept="image/*"
                    onChange={(e) => handleChange(e, index)}
                    className="flex-grow border border-gray-300 rounded px-3 py-2"
                    disabled={loading}
                  />
                  {formData.uploadedImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="text-red-500 hover:text-red-700 font-bold px-2"
                      title="Remove this image"
                      disabled={loading}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}

            <button
              type="button"
              onClick={addImageField}
              className="mt-2 px-3 py-1 bg-osunblue text-white rounded hover:bg-osunblue-dark transition"
              disabled={loading}
            >
              Add More Images
            </button>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-osunblue text-white px-6 py-2 rounded hover:bg-osunblue-dark transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
