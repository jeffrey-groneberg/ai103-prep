// Renders the app icons (home screen, install dialog) from the "103" mark in public/favicon.svg.
// Usage: npm run icons:pwa. Writes PNGs to public/icons/; commit them.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const out = fileURLToPath(new URL('../public/icons/', import.meta.url))
mkdirSync(out, { recursive: true })

const FONT = 'Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif'

/** Brand square with "103"; digits are optically centred (cap height ≈ 0.71 em). */
function mark({ size, radius, fontScale }) {
  const fontSize = size * fontScale
  const baseline = size / 2 + fontSize * 0.355
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="#0f6cbd"/>
  <text x="${size / 2}" y="${baseline}" text-anchor="middle" font-family="${FONT}" font-size="${fontSize}" font-weight="700" fill="#fff">103</text>
</svg>`
}

const icons = [
  // Regular icons keep the favicon's rounded square on a transparent background.
  { file: 'icon-192.png', size: 192, radius: (192 * 7) / 32, fontScale: 0.39 },
  { file: 'icon-512.png', size: 512, radius: (512 * 7) / 32, fontScale: 0.39 },
  // Maskable: full bleed, digits inside the 80 % safe zone so any launcher mask keeps them whole.
  { file: 'icon-maskable-512.png', size: 512, radius: 0, fontScale: 0.3 },
  // iOS rounds the corners itself and needs an opaque square.
  { file: 'apple-touch-icon.png', size: 180, radius: 0, fontScale: 0.35 },
]

const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 1 })
for (const icon of icons) {
  await page.setViewportSize({ width: icon.size, height: icon.size })
  await page.setContent(`<html><body style="margin:0;background:transparent">${mark(icon)}</body></html>`)
  await page.locator('svg').screenshot({ path: out + icon.file, omitBackground: true })
  console.log(`wrote public/icons/${icon.file}`)
}
await browser.close()
