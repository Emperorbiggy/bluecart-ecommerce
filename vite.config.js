import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/bluecart/', // ✅ This ensures all assets load from the subfolder
  plugins: [
    laravel({
      input: 'resources/js/app.jsx',
      refresh: true,
      buildDirectory: 'build', // ✅ important if you changed default
    }),
    react(),
  ],
});

