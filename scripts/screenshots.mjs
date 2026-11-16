/* global document, window */
// Capturas de revisión visual en 360, 768, 1024, 1440 y 1920 px, en modo claro y oscuro.
// Uso: node scripts/screenshots.mjs [ruta ...]   (salida en reports/screenshots/)
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer';
import { serve } from './serve.mjs';

const widths = [360, 768, 1024, 1440, 1920];
const paths = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      '/',
      '/servicios/',
      '/servicios/sitios-web/',
      '/nosotros/',
      '/contacto/',
      '/privacidad/',
      '/en/',
      '/no-existe/',
    ];
const out = 'reports/screenshots';
await mkdir(out, { recursive: true });

const server = await serve('dist', 4321);
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
for (const scheme of ['light', 'dark']) {
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: scheme },
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ]);
  for (const path of paths) {
    for (const width of widths) {
      await page.setViewport({ width, height: 900 });
      await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle0' });
      // Recorrer la página para cargar imágenes diferidas y activar animaciones de entrada.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await new Promise((r) => setTimeout(r, 300));
      const name = `${path.replace(/\//g, '_').replace(/^_|_$/g, '') || 'inicio'}-${width}-${scheme}.png`;
      await page.screenshot({ path: `${out}/${name}`, fullPage: true });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (overflow) console.warn(`⚠ Desbordamiento horizontal: ${path} @ ${width}px (${scheme})`);
    }
  }
}
await browser.close();
server.close();
console.log(`Capturas en ${out}/`);
