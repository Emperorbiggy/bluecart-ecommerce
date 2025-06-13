// resources/js/Layouts/AppLayout.jsx

import Header from '../components/Header';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-6 px-4 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
