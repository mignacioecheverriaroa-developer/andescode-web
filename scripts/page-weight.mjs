/* global document, window */
// Calcula el peso de transferencia de cada página (HTML + CSS + JS + fuentes + imágenes que
// carga el navegador en una ventana de 1440 px) y falla si la portada supera el presupuesto.
// Uso: node scripts/page-weight.mjs   (escribe reports/page-weight.json)
import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';
import { serve } from './serve.mjs';

const BUDGET_HOME = 500 * 1024;
const PORT = 4323;
const pages = [
  '/',
  '/nosotros/',
  '/servicios/',
  '/proyectos/',
  '/servicios/sitios-web/',
  '/contacto/',
  '/privacidad/',
  '/404.html',
  '/en/',
  '/en/about/',
  '/en/services/',
  '/en/services/websites/',
  '/en/contact/',
  '/en/privacy/',
];

const server = await serve('dist', PORT);
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const results = [];
for (const path of pages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const sizes = new Map();
  page.on('response', async (response) => {
    try {
      const buf = await response.buffer();
      sizes.set(response.url(), buf.length);
    } catch {
      /* respuestas sin cuerpo */
    }
  });
  await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle0' });
  // Desplazar hasta el final para incluir imágenes con carga diferida.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 400));
  const total = [...sizes.values()].reduce((a, b) => a + b, 0);
  results.push({ path, requests: sizes.size, bytes: total, kb: Math.round(total / 102.4) / 10 });
  await page.close();
}
await browser.close();
server.close();

await mkdir('reports', { recursive: true });
await writeFile('reports/page-weight.json', JSON.stringify(results, null, 2));
console.table(
  results.map(({ path, requests, kb }) => ({
    página: path,
    solicitudes: requests,
    'KB (sin comprimir)': kb,
  })),
);
const home = results.find((r) => r.path === '/');
if (home.bytes > BUDGET_HOME) {
  console.error(`La portada pesa ${home.kb} KB y supera el presupuesto de 500 KB.`);
  process.exit(1);
}
console.log(`✔ Portada: ${home.kb} KB (presupuesto 500 KB)`);
