// vite.config.ts
// vite.config.ts

/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test.setup.ts',
    css: true,
    // Add the coverage configuration here:
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'], // Generate a report in the terminal and a detailed HTML report
      all: true, // Show coverage for all files, not just the ones with tests
      include: ['src/components/**/*.{ts,tsx}'], // Only include component files in the report
      exclude: [ // Exclude files that are not relevant for coverage
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/test.setup.ts',
        'src/components/**/*.test.{ts,tsx}',
      ],
    },
  },
})