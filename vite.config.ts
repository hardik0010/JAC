import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'remove-console',
      transform(code, id) {
        if (process.env.NODE_ENV === 'production' && id.endsWith('.tsx')) {
          return {
            code: code.replace(/console\.(log|debug|info)\((.*?)\);?/g, ''),
            map: null
          }
        }
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  define: {
    'process.env': process.env
  }
})