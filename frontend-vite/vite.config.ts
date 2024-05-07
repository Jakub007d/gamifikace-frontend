import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(),VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      clientsClaim: true,
      skipWaiting: true
    },
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      name: 'GamifikaceVUT',
      short_name: 'Gamifikace',
      description: 'Gamifikačná aplikácia pre študentov VUT',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})
