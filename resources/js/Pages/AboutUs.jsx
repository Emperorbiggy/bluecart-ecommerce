import React from 'react'
import AppLayout from '../Layouts/AppLayout'

export default function AboutUs() {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative bg-[#130447] text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About BlueCart</h1>
          <p className="text-lg md:text-xl text-white/90">
            Empowering Nigeria’s commerce through seamless technology, trust, and service.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#130447] mb-4">Who We Are</h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          BlueCart is an innovative e-commerce platform built to connect Nigerians with quality products, reliable sellers,
          and seamless shopping experiences. From everyday essentials to premium electronics and fashion — we help you buy
          smarter and sell faster.
        </p>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold text-[#130447] mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To empower Nigerians with a secure, user-friendly, and community-driven online shopping experience that fosters trust,
            affordability, and convenience for all.
          </p>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold text-[#130447] mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To be Nigeria’s most trusted digital marketplace — transforming how people buy, sell, and interact through technology.
          </p>
        </div>
      </section>

      {/* Optional Stats or Team Section */}
      {/* <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        Add a team grid, company milestones or values here
      </section> */}
    </AppLayout>
  )
}
