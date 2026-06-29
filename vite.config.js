import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — cached long-term by browsers
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Helmet — rarely changes
          'vendor-helmet': ['react-helmet-async'],
          // Stripe — only loaded on checkout pages
          'vendor-stripe': ['@stripe/react-stripe-js', '@stripe/stripe-js'],
        },
      },
    },
  },
})
