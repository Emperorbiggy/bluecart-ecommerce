// resources/js/Layouts/AppLayout.jsx

import { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CartProvider } from '@/contexts/CartContext'
import BlueCartLoader from '../components/BlueCartLoader'

export default function AppLayout({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fake delay to simulate app setup
    const initTimer = setTimeout(() => setLoading(false), 500)

    // Inertia events
    const handleStart = () => setLoading(true)
    const handleFinish = () => setLoading(false)

    router.on('start', handleStart)
    router.on('finish', handleFinish)

    // Cleanup only remove start/finish logic from internal state
    return () => {
      clearTimeout(initTimer)
      // ⚠️ No .off method in @inertiajs/react, so skip
    }
  }, [])

  return (
    <CartProvider>
      {loading && <BlueCartLoader />}
      <div className={`min-h-screen bg-gray-50 flex flex-col overflow-x-hidden ${loading ? 'hidden' : ''}`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  )
}
