import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'
import { execSync } from 'node:child_process'

/** Short commit of this build: shown in feedback issues, so a report names the exact version it came from. */
function appVersion(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7)
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return 'dev'
  }
}

// Relative base so the build works from any static host or sub-path (hash routing), e.g. GitHub Pages.
// The dev server keeps one fixed address so the locally stored progress (localStorage is per origin) stays put.
export default defineConfig({
  base: './',
  define: { __APP_VERSION__: JSON.stringify(appVersion()) },
  plugins: [
    react(),
    // Installable app with offline support. Production builds only; the site still works as a normal web page.
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        id: './',
        name: 'AI-103 Prep',
        short_name: 'AI-103',
        description: 'Lern-App für die Microsoft-Prüfung AI-103: Lektionen mit Diagrammen, Übungsfragen und Prüfungssimulation, auch offline.',
        lang: 'de',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#f5f5f5',
        theme_color: '#ffffff',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      // The plugin adds the manifest itself; the glob already covers the icons.
      includeManifestIcons: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Lessons and questions ship in one bundle (about 2.6 MB) and the Zettelkasten cards in another (about
        // 1.3 MB), both above Workbox's 2 MiB default; the limit leaves room for the content to grow.
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        // The Zettelkasten cards (four options with reasons each) get their own file, so the main bundle stays lean.
        advancedChunks: { groups: [{ name: 'zettel-cards', test: /src[\\/]content[\\/]cards[\\/]/ }] },
      },
    },
  },
  server: { port: 5173, strictPort: true },
  // The preview serves the production build with its offline service worker, so it gets its own address:
  // a service worker on 5173 would otherwise keep answering for the dev server.
  preview: { port: 4173, strictPort: true },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.{ts,tsx}'],
  },
})
