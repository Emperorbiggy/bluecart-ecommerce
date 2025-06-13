import { Link } from '@inertiajs/react';
import { ShoppingCart, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full shadow-sm z-50">
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
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-osunblue tracking-wide">
            Blue<span className="text-osunblue-700">Cart</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-osunblue transition">Home</Link>
            <Link href="/products" className="hover:text-osunblue transition">Products</Link>
            <Link href="/categories" className="hover:text-osunblue transition">Categories</Link>
            <Link href="/about" className="hover:text-osunblue transition">About Us</Link>
            <Link href="/contact" className="hover:text-osunblue transition">Contact</Link>
          </nav>

          {/* Icons */}
          <div className="flex gap-6 items-center">
            {/* Cart */}
            <Link href="/cart" className="relative text-gray-600 hover:text-osunblue transition">
              <ShoppingCart className="w-5 h-5" />
              {/* Optional: Add badge */}
              {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span> */}
            </Link>

            {/* Account */}
            <Link href="/account" className="text-gray-600 hover:text-osunblue flex items-center gap-1">
              <User className="w-5 h-5" />
              <span className="text-sm hidden md:inline">My Account</span>
            </Link>
          </div>
        </div>

        {/* Mobile Nav (Optional if you're supporting small screens) */}
        <div className="md:hidden border-t px-4 py-2 bg-white text-sm text-gray-600 flex justify-between">
          <Link href="/" className="hover:text-osunblue">Home</Link>
          <Link href="/products" className="hover:text-osunblue">Products</Link>
          <Link href="/categories" className="hover:text-osunblue">Categories</Link>
          <Link href="/about" className="hover:text-osunblue">About</Link>
          <Link href="/contact" className="hover:text-osunblue">Contact</Link>
        </div>
      </div>
    </header>
  );
}
