import { Link } from '@inertiajs/react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileNavOpen(!isMobileNavOpen);

  return (
    <header className="w-full shadow-sm z-50 relative bg-white">
      {/* Top Contact Bar */}
      <div className="bg-osunblue text-white text-sm py-2 px-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <span>📞 +234 800 123 4567</span>
          <span>📧 support@bluecart.com</span>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <span>📍 Osogbo, Osun State</span>
          <span>🕒 Mon - Sat: 9:00am - 6:00pm</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo with Icon */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-osunblue tracking-wide">
            <ShoppingCart className="w-6 h-6 text-osunblue-700" />
            <span>
              Blue<span className="text-osunblue-700">Cart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-osunblue transition">Home</Link>
            <Link href="/products" className="hover:text-osunblue transition">Products</Link>
            <Link href="/categories" className="hover:text-osunblue transition">Categories</Link>
            <Link href="/about" className="hover:text-osunblue transition">About Us</Link>
            <Link href="/contact" className="hover:text-osunblue transition">Contact</Link>
          </nav>

          {/* Icons & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative text-gray-600 hover:text-osunblue transition">
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* Account */}
            <Link href="/account" className="text-gray-600 hover:text-osunblue flex items-center gap-1">
              <User className="w-5 h-5" />
              <span className="text-sm hidden md:inline">My Account</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMobileMenu} className="md:hidden text-osunblue focus:outline-none">
              {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileNavOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3 text-gray-700 font-medium shadow">
          <Link href="/" className="block hover:text-osunblue">Home</Link>
          <Link href="/products" className="block hover:text-osunblue">Products</Link>
          <Link href="/categories" className="block hover:text-osunblue">Categories</Link>
          <Link href="/about" className="block hover:text-osunblue">About Us</Link>
          <Link href="/contact" className="block hover:text-osunblue">Contact</Link>
        </div>
      )}
    </header>
  );
}
