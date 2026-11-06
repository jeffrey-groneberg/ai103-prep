import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Relative base so the build works from any static host or sub-path (hash routing).
// Dev and preview share one address so the locally stored progress (localStorage is per origin) stays put.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  preview: { port: 5173, strictPort: true },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.{ts,tsx}'],
  },
})
