// resources/js/Layouts/AppLayout.jsx

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Allow full-width children like hero/banner */}
      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
