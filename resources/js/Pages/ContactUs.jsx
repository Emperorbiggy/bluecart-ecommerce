// resources/js/Pages/ContactUs.jsx
import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import AppLayout from '../Layouts/AppLayout'

export default function ContactUs() {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative bg-[#130447] text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg">Have questions, suggestions or need support? We'd love to hear from you!</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {/* Phone */}
  <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
    <div className="bg-[#130447] text-white rounded-full p-3 mb-4">
      <Phone className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold text-[#130447]">Call Us</h3>
    <p className="text-gray-600 mt-2">+234 800 123 4567</p>
  </div>

  {/* Email */}
  <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
    <div className="bg-[#130447] text-white rounded-full p-3 mb-4">
      <Mail className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold text-[#130447]">Email</h3>
    <p className="text-gray-600 mt-2">support@bluecart.com</p>
  </div>

  {/* Address */}
  <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
    <div className="bg-[#130447] text-white rounded-full p-3 mb-4">
      <MapPin className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold text-[#130447]">Visit Us</h3>
    <p className="text-gray-600 mt-2">Osogbo, Osun State</p>
  </div>
</section>


      {/* Contact Form Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#130447] mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#130447]" />
              <input type="email" placeholder="Your Email" className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#130447]" />
            </div>
            <input type="text" placeholder="Subject" className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#130447]" />
            <textarea rows="5" placeholder="Your Message" className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#130447]" />
            <button type="submit" className="bg-[#130447] text-white px-6 py-3 rounded-full hover:bg-[#0f0339] transition font-medium">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* CTA with Background Image */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-24 px-4 text-white text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581090700227-1e8e8c6c1c5b?q=80&w=2000&auto=format&fit=crop')`,
        }}
      >
        <div className="bg-[#130447]/80 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">We’re Here to Help</h2>
          <p className="mb-6 text-lg">Reach out to us for any product inquiries, support, or partnership ideas.</p>
          <a href="/products" className="inline-block bg-white text-[#130447] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Explore Our Products
          </a>
        </div>
      </section>
    </AppLayout>
  )
}
