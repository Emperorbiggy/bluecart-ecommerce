import Header from '../components/Header'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* No container here to allow full-width sections */}
      <main>{children}</main>
    </div>
  )
}
