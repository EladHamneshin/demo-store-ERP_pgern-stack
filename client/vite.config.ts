/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/erp',
  server: {
    proxy: {   
      '/erp/api': {
        target: env.VITE_BASE_URI,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
