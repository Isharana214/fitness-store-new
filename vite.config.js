import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  base: '/',   // ⭐⭐⭐ IMPORTANT FIX FOR VERCEL

  build: {
    chunkSizeWarningLimit: 1000,
  },
})