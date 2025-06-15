// resources/js/Layouts/AppLayout.jsx

import Header from '../components/Header'
import Footer from '../components/Footer'
import { CartProvider } from '@/contexts/CartContext' // ✅ Importing CartProvider context

export default function AppLayout({ children }) {
  return (
    <CartProvider> {/* ✅ Makes cart context available throughout the app */}
      <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  )
}
