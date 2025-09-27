import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@base-org/account'],
    include: ['@privy-io/react-auth', '@privy-io/wagmi', '@tanstack/react-query', 'framer-motion']
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
      util: 'util',
    },
  },
  build: {
    rollupOptions: {
      external: ['@safe-globalThis/safe-apps-sdk', '@safe-globalThis/safe-apps-provider'],
      plugins: [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        }
      },
      onwarn(warning, warn) {
        // Ignore Safe wallet related warnings
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.id?.includes('@safe-global')) {
          return
        }
        warn(warning)
      }
    }
  }
})
