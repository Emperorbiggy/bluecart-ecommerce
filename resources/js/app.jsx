import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import { Inertia } from '@inertiajs/inertia'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

// ✅ Log token from localStorage
Inertia.on('before', (event) => {
  const token = localStorage.getItem('token')
  console.log('🧪 Token from localStorage:', token)

  if (token) {
    event.detail.visit.headers = {
      ...event.detail.visit.headers,
      Authorization: `Bearer ${token}`,
    }
  }
})

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(<App {...props} />)
  },
  progress: {
    color: '#4B5563',
  },
})
