import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import adonisjs from '@adonisjs/vite/client'
import reactCall from 'react-call/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    reactCall(),
    adonisjs({
      entryPoints: ['inertia/app/app.tsx'],
      reload: ['resources/views/**/*.edge'],
      assets: ['resources/favicon/**'],
    }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${import.meta.dirname}/inertia/`,
      '@generated': `${import.meta.dirname}/.adonisjs/client/`,
    },
  },

  server: {
    watch: {
      ignored: ['**/storage/**', '**/tmp/**'],
    },
  },
})
