import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { url } = usePage();

  const toggleMobileMenu = () => setIsMobileNavOpen(!isMobileNavOpen);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const linkBaseClass = `px-3 py-1 rounded-md transition font-medium`;
  const getLinkClass = (href) =>
    `${linkBaseClass} ${
      url === href
        ? 'bg-osunblue text-white'
        : 'text-gray-700 hover:bg-osunblue hover:text-white'
    }`;

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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-osunblue tracking-wide">
            <ShoppingCart className="w-6 h-6 text-osunblue-700" />
            <span>
              Blue<span className="text-osunblue-700">Cart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-3">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} className={getLinkClass(href)}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Icons, Search & Mobile Toggle */}
          <div className="flex items-center gap-4">
           {/* Search box */}
<div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 transition">
  <Search className="w-4 h-4 text-gray-500" />
  <input
    type="text"
    placeholder="Search products..."
    className="ml-2 bg-transparent outline-none text-sm placeholder:text-gray-400 w-40"
  />
</div>


            {/* Cart */}
            <Link href="/cart" className="relative text-gray-600 hover:text-osunblue transition">
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* Account */}
            <Link href="/account" className="text-gray-600 hover:text-osunblue flex items-center gap-1">
              <User className="w-5 h-5" />
              <span className="text-sm hidden md:inline">My Account</span>
            </Link>

            {/* Mobile Toggle */}
            <button onClick={toggleMobileMenu} className="md:hidden text-osunblue focus:outline-none">
              {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileNavOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2 text-gray-700 font-medium shadow">
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className={`${getLinkClass(href)} block`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
