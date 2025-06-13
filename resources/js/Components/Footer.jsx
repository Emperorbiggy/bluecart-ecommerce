import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#130447] text-white mt-16">
      <div className="max-w-7xl mx-auto py-12 px-6 grid md:grid-cols-3 gap-10">

        {/* Column 1: Logo and About Us */}
        <div>
          {/* Logo with Cart Icon */}
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-6 h-6 text-white" />
            <span className="text-2xl font-bold text-white tracking-wide">
              Blue<span className="text-gray-300">Cart</span>
            </span>
          </div>

          {/* About Us */}
          <h3 className="text-lg font-semibold border-b-2 border-white inline-block mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
            BlueCart is your trusted online marketplace for fashion, gadgets, and more.
            We offer great deals, fast delivery, and quality you can rely on.
          </p>
        </div>

        {/* Column 2: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-white inline-block mb-4">Get in Touch</h3>
          <ul className="text-sm space-y-2">
            <li>📞 +234 800 123 4567</li>
            <li>📧 support@bluecart.com</li>
            <li>📍 Osogbo, Osun State, Nigeria</li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-white inline-block mb-4">Newsletter</h3>
          <p className="text-sm mb-3">Subscribe to get updates, deals and more straight to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-800 border rounded focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-[#130447] px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#0f033a] text-center text-sm text-gray-300 py-4 px-6">
        © All rights reserved. Designed with ❤️ by{' '}
        <a
          href="https://profile.rifelinktech.com.ng"
          className="text-white font-medium hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ayodeji Samuel Ajayi
        </a>
      </div>
    </footer>
  );
}
