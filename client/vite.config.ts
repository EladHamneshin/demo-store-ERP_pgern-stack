import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {   
  //     '/api': {
  //       target: import.meta.url,
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
