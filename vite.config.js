import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api-vndb': {
        target: 'https://api.vndb.org',
        changeOrigin: true,
        followRedirects: false, // Prevents Vite from falling into the redirect loop
        rewrite: (path) => path.replace(/^\/api-vndb/, '/kana/vn'), // Added trailing slash here
      },
    },
  }
})
