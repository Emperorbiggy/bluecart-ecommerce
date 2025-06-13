import { useState } from 'react'
import AdminLayout from '../Layouts/AdminLayout'

export default function AddProduct() {
  const [activeTab, setActiveTab] = useState('app-product')

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    shortDescription: '',
    details: '',
    discount: '',
    images: [''],
    imageInputType: 'url', // 'url' or 'upload'
    uploadedImages: [null],
  })

  const priceNum = parseFloat(formData.price) || 0
  const discountNum = parseFloat(formData.discount) || 0
  const discountedPrice = priceNum - (priceNum * discountNum) / 100

  const handleChange = (e, index = null) => {
    const { name, value, type, files } = e.target

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

  const handleSubmit = (e) => {
    e.preventDefault()

    const productToSubmit = {
      ...formData,
      price: priceNum,
      discount: discountNum,
      discountedPrice,
      images:
        formData.imageInputType === 'url'
          ? formData.images.filter((url) => url.trim() !== '')
          : formData.uploadedImages.filter((file) => file !== null),
    }

    console.log('Submitting product:', productToSubmit)
    alert('Product submitted! Check console for details.')

    setFormData({
      name: '',
      price: '',
      shortDescription: '',
      details: '',
      discount: '',
      images: [''],
      uploadedImages: [null],
      imageInputType: 'url',
    })
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
            />
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
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="text-red-500 hover:text-red-700 font-bold px-2"
                      title="Remove this image"
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
                  />
                  {formData.uploadedImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="text-red-500 hover:text-red-700 font-bold px-2"
                      title="Remove this image"
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
            >
              Add More Images
            </button>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-osunblue text-white px-6 py-2 rounded hover:bg-osunblue-dark transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
