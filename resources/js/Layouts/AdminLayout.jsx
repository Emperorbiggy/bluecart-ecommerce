import AdminSidebar from '../components/AdminSidebar'

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Spacer for mobile top bar */}
        <div className="h-[64px] md:hidden flex-shrink-0" />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
